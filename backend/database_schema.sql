-- Database Schema for Chore Economy App
-- Compatible with Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication and user management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    is_demo_account BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Groups table for household/group management
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    invitation_code VARCHAR(20) UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Group members junction table
CREATE TABLE group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);

-- Money pools for groups
CREATE TABLE money_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    remaining_amount DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    success_criteria TEXT NOT NULL,
    reward_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'submitted', 'completed', 'rejected')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Task submissions for photo evidence
CREATE TABLE task_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    photo_url VARCHAR(500) NOT NULL,
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Voting system for task approval
CREATE TABLE task_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    voter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote VARCHAR(10) NOT NULL CHECK (vote IN ('approve', 'reject')),
    comment TEXT,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(task_id, voter_id)
);

-- Transaction history for payments
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    money_pool_id UUID REFERENCES money_pools(id) ON DELETE SET NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('earned', 'deposited', 'withdrawn')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    stripe_payment_intent_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_groups_invitation_code ON groups(invitation_code);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
CREATE INDEX idx_tasks_group_id ON tasks(group_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_task_votes_task_id ON task_votes(task_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_money_pools_group_id ON money_pools(group_id);

-- Functions for automatic updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_money_pools_updated_at BEFORE UPDATE ON money_pools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE money_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you may need to customize these based on your auth setup)
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Group members can view group details" ON groups
    FOR SELECT USING (
        id IN (
            SELECT group_id FROM group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view groups they belong to" ON group_members
    FOR SELECT USING (
        user_id = auth.uid() OR 
        group_id IN (
            SELECT group_id FROM group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Group members can view tasks in their groups" ON tasks
    FOR SELECT USING (
        group_id IN (
            SELECT group_id FROM group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own transactions" ON transactions
    FOR SELECT USING (user_id = auth.uid());

-- Insert demo data function
CREATE OR REPLACE FUNCTION insert_demo_data()
RETURNS void AS $$
BEGIN
    -- Create demo users
    INSERT INTO users (id, email, password_hash, first_name, last_name, is_demo_account, wallet_balance) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'demo1@example.com', '$2b$12$demo_hash_1', 'Alice', 'Johnson', true, 25.50),
    ('550e8400-e29b-41d4-a716-446655440002', 'demo2@example.com', '$2b$12$demo_hash_2', 'Bob', 'Smith', true, 15.25),
    ('550e8400-e29b-41d4-a716-446655440003', 'demo3@example.com', '$2b$12$demo_hash_3', 'Carol', 'Davis', true, 32.75),
    ('550e8400-e29b-41d4-a716-446655440004', 'demo4@example.com', '$2b$12$demo_hash_4', 'David', 'Wilson', true, 8.00),
    ('550e8400-e29b-41d4-a716-446655440005', 'demo5@example.com', '$2b$12$demo_hash_5', 'Emma', 'Brown', true, 41.20);
    
    -- Create demo group
    INSERT INTO groups (id, name, description, invitation_code, created_by) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'Demo House', 'A sample household for testing the app', 'DEMO123', '550e8400-e29b-41d4-a716-446655440001');
    
    -- Add all demo users to the demo group
    INSERT INTO group_members (group_id, user_id, role) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'admin'),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'member'),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'member'),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'member'),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 'member');
    
    -- Create demo money pool
    INSERT INTO money_pools (id, group_id, name, total_amount, remaining_amount, created_by) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'January Chore Fund', 200.00, 150.75, '550e8400-e29b-41d4-a716-446655440001');
    
    -- Create demo tasks
    INSERT INTO tasks (id, group_id, created_by, title, description, success_criteria, reward_amount, status) VALUES
    ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Clean Kitchen', 'Deep clean the kitchen including counters, sink, and appliances', 'All surfaces wiped down, dishes done, floor swept and mopped', 15.00, 'available'),
    ('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Vacuum Living Room', 'Vacuum the entire living room carpet', 'All visible dirt and debris removed from carpet', 10.00, 'assigned'),
    ('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Take Out Trash', 'Empty all trash bins and take to curb', 'All trash bins emptied and bags placed at curb for pickup', 5.00, 'completed');
    
    -- Assign one task
    UPDATE tasks SET assigned_to = '550e8400-e29b-41d4-a716-446655440003', assigned_at = CURRENT_TIMESTAMP 
    WHERE id = '850e8400-e29b-41d4-a716-446655440002';
    
END;
$$ LANGUAGE plpgsql;

-- Call the demo data function (uncomment when ready to populate demo data)
-- SELECT insert_demo_data(); 