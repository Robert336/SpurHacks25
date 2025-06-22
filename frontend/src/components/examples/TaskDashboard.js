import { 
  Section, 
  Card, 
  Table, 
  Button, 
  Badge, 
  Avatar,
  IconButton 
} from '../index';

const TaskDashboard = ({ user, tasks = [] }) => {
  // Example task data structure
  const exampleTasks = tasks.length > 0 ? tasks : [
    {
      id: 1,
      name: "Clean Kitchen",
      assignee: "John",
      status: "In Progress",
      reward: "$15",
      dueDate: "2024-01-15"
    },
    {
      id: 2, 
      name: "Take Out Trash",
      assignee: "Sarah",
      status: "Completed",
      reward: "$5",
      dueDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Vacuum Living Room", 
      assignee: "Mike",
      status: "Pending",
      reward: "$10",
      dueDate: "2024-01-16"
    }
  ];
  
  const tableHeaders = ['Task', 'Assignee', 'Status', 'Reward', 'Due Date', 'Actions'];
  
  const tableData = exampleTasks.map(task => [
    task.name,
    <div className="flex items-center space-x-2">
      <Avatar size="sm" fallback={task.assignee.charAt(0)} />
      <span>{task.assignee}</span>
    </div>,
    <Badge 
      variant={
        task.status === 'Completed' ? 'green' : 
        task.status === 'In Progress' ? 'purple' : 'default'
      }
      size="sm"
    >
      {task.status}
    </Badge>,
    <span className="font-medium text-[#3C6E57]">{task.reward}</span>,
    task.dueDate,
    <div className="flex space-x-2">
      <IconButton size="sm" variant="ghost" icon="✏️" />
      <IconButton size="sm" variant="ghost" icon="🗑️" />
    </div>
  ]);

  return (
    <Section background="default" padding="default">
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#3C6E57] mb-2">
              Task Dashboard
            </h1>
            <p className="text-[#2E5744]/80">
              Manage your household tasks and track progress
            </p>
          </div>
          <Button variant="primary" size="md">
            Create Task
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card padding="lg" className="text-center">
            <div className="text-3xl font-bold text-[#3C6E57] mb-2">12</div>
            <div className="text-[#2E5744]/80">Total Tasks</div>
          </Card>
          <Card padding="lg" className="text-center">
            <div className="text-3xl font-bold text-[#74A27E] mb-2">8</div>
            <div className="text-[#2E5744]/80">Completed</div>
          </Card>
          <Card padding="lg" className="text-center">
            <div className="text-3xl font-bold text-[#9A7FF5] mb-2">3</div>
            <div className="text-[#2E5744]/80">In Progress</div>
          </Card>
          <Card padding="lg" className="text-center">
            <div className="text-3xl font-bold text-[#FFD972] mb-2">$85</div>
            <div className="text-[#2E5744]/80">Total Rewards</div>
          </Card>
        </div>
        
        {/* Tasks Table */}
        <Card padding="none">
          <div className="p-6 border-b border-[#E9D8C5]">
            <h2 className="text-2xl font-bold text-[#3C6E57]">Recent Tasks</h2>
          </div>
          <Table 
            headers={tableHeaders}
            data={tableData}
            variant="default"
            className="border-none shadow-none"
          />
        </Card>
      </div>
    </Section>
  );
};

export default TaskDashboard; 