-- Database Schema for Chore Economy App
-- Compatible with Supabase (PostgreSQL)

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (extends auth.users)
-- This table stores additional user information beyond what's in auth.users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    wallet_balance DECIMAL(10,2) DEFAULT 0.00 CHECK (wallet_balance >= 0),
    is_demo_account BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Groups table for household/group management
CREATE TABLE public.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT,
    invitation_code TEXT UNIQUE NOT NULL CHECK (length(invitation_code) >= 6),
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group membership junction table
CREATE TABLE public.group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(group_id, user_id)
);

-- Money pools for shared funding
CREATE TABLE public.money_pools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL CHECK (length(name) > 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    remaining_amount DECIMAL(10,2) NOT NULL CHECK (remaining_amount >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CHECK (remaining_amount <= total_amount)
);

-- Tasks/chores table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL CHECK (length(title) > 0),
    description TEXT NOT NULL CHECK (length(description) > 0),
    success_criteria TEXT NOT NULL CHECK (length(success_criteria) > 0),
    reward_amount DECIMAL(10,2) NOT NULL CHECK (reward_amount > 0),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'submitted', 'completed', 'rejected')),
    assigned_at TIMESTAMPTZ,
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task submission evidence (photos, notes)
CREATE TABLE public.task_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    photo_urls TEXT[] DEFAULT '{}', -- Array of photo URLs for flexibility
    notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task approval voting system
CREATE TABLE public.task_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    voter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vote TEXT NOT NULL CHECK (vote IN ('approve', 'reject')),
    comment TEXT,
    voted_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(task_id, voter_id)
);

-- Financial transaction history
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
    money_pool_id UUID REFERENCES public.money_pools(id) ON DELETE SET NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'deposited', 'withdrawn', 'refunded')),
    amount DECIMAL(10,2) NOT NULL CHECK (amount != 0),
    description TEXT,
    stripe_payment_intent_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at);
CREATE INDEX idx_groups_invitation_code ON public.groups(invitation_code);
CREATE INDEX idx_groups_created_by ON public.groups(created_by);
CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_group_members_user_id ON public.group_members(user_id);
CREATE INDEX idx_money_pools_group_id ON public.money_pools(group_id);
CREATE INDEX idx_money_pools_active ON public.money_pools(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_tasks_group_id ON public.tasks(group_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date) WHERE due_date IS NOT NULL;
CREATE INDEX idx_task_submissions_task_id ON public.task_submissions(task_id);
CREATE INDEX idx_task_votes_task_id ON public.task_votes(task_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);

-- Updated timestamp trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_groups BEFORE UPDATE ON public.groups
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_money_pools BEFORE UPDATE ON public.money_pools
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_tasks BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name)
    VALUES (NEW.id, '', '');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.money_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view profiles in their groups" ON public.profiles
    FOR SELECT USING (
        id IN (
            SELECT user_id FROM public.group_members 
            WHERE group_id IN (
                SELECT group_id FROM public.group_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- RLS Policies for groups
CREATE POLICY "Group members can view their groups" ON public.groups
    FOR SELECT USING (
        id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create groups" ON public.groups
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group admins can update groups" ON public.groups
    FOR UPDATE USING (
        id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for group_members
CREATE POLICY "Users can view group memberships" ON public.group_members
    FOR SELECT USING (
        user_id = auth.uid() OR 
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Group admins can manage members" ON public.group_members
    FOR ALL USING (
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for money_pools
CREATE POLICY "Group members can view money pools" ON public.money_pools
    FOR SELECT USING (
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Group admins can manage money pools" ON public.money_pools
    FOR ALL USING (
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for tasks
CREATE POLICY "Group members can view tasks" ON public.tasks
    FOR SELECT USING (
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Group members can create tasks" ON public.tasks
    FOR INSERT WITH CHECK (
        auth.uid() = created_by AND
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Task creators and assignees can update tasks" ON public.tasks
    FOR UPDATE USING (
        created_by = auth.uid() OR 
        assigned_to = auth.uid() OR
        group_id IN (
            SELECT group_id FROM public.group_members 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for task_submissions
CREATE POLICY "Users can view submissions for their group tasks" ON public.task_submissions
    FOR SELECT USING (
        task_id IN (
            SELECT id FROM public.tasks
            WHERE group_id IN (
                SELECT group_id FROM public.group_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Task assignees can create submissions" ON public.task_submissions
    FOR INSERT WITH CHECK (
        auth.uid() = submitted_by AND
        task_id IN (
            SELECT id FROM public.tasks 
            WHERE assigned_to = auth.uid()
        )
    );

-- RLS Policies for task_votes
CREATE POLICY "Group members can view votes" ON public.task_votes
    FOR SELECT USING (
        task_id IN (
            SELECT id FROM public.tasks
            WHERE group_id IN (
                SELECT group_id FROM public.group_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Group members can vote on tasks" ON public.task_votes
    FOR INSERT WITH CHECK (
        auth.uid() = voter_id AND
        task_id IN (
            SELECT id FROM public.tasks
            WHERE group_id IN (
                SELECT group_id FROM public.group_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create transactions" ON public.transactions
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Helper views for common queries
CREATE VIEW public.user_group_memberships AS
SELECT 
    gm.*,
    g.name as group_name,
    g.invitation_code,
    p.first_name,
    p.last_name
FROM public.group_members gm
JOIN public.groups g ON gm.group_id = g.id
JOIN public.profiles p ON gm.user_id = p.id;

CREATE VIEW public.task_details AS
SELECT 
    t.*,
    g.name as group_name,
    creator.first_name || ' ' || creator.last_name as created_by_name,
    assignee.first_name || ' ' || assignee.last_name as assigned_to_name
FROM public.tasks t
JOIN public.groups g ON t.group_id = g.id
JOIN public.profiles creator ON t.created_by = creator.id
LEFT JOIN public.profiles assignee ON t.assigned_to = assignee.id;

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Note: To populate with demo data, create users through Supabase Auth first,
-- then manually insert profile data referencing those auth user IDs 
