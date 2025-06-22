import { 
  PageLayout,
  Section, 
  Card, 
  Table, 
  Button, 
  Badge, 
  Avatar,
  IconButton 
} from '../../components';

export default function Dashboard() {
  // Example user data
  const user = {
    name: "John Doe",
    avatar: null
  };
  
  const navigation = [
    { href: "/", label: "Home" },
    { href: "/demo", label: "Demo" },
    { href: "/dashboard", label: "Dashboard" }
  ];
  
  // Example task data
  const tasks = [
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
    },
    {
      id: 4,
      name: "Do Laundry",
      assignee: "Emma",
      status: "In Progress", 
      reward: "$12",
      dueDate: "2024-01-17"
    },
    {
      id: 5,
      name: "Clean Bathroom",
      assignee: "Alex",
      status: "Completed",
      reward: "$20",
      dueDate: "2024-01-13"
    }
  ];
  
  const tableHeaders = ['Task', 'Assignee', 'Status', 'Reward', 'Due Date', 'Actions'];
  
  const tableData = tasks.map(task => [
    task.name,
    <div key={task.id} className="flex items-center space-x-2">
      <Avatar size="sm" fallback={task.assignee.charAt(0)} />
      <span>{task.assignee}</span>
    </div>,
    <Badge 
      key={`status-${task.id}`}
      variant={
        task.status === 'Completed' ? 'green' : 
        task.status === 'In Progress' ? 'purple' : 'default'
      }
      size="sm"
    >
      {task.status}
    </Badge>,
    <span key={`reward-${task.id}`} className="font-medium text-[#3C6E57]">{task.reward}</span>,
    task.dueDate,
    <div key={`actions-${task.id}`} className="flex space-x-2">
      <IconButton size="sm" variant="ghost" icon="✏️" />
      <IconButton size="sm" variant="ghost" icon="🗑️" />
    </div>
  ]);

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const totalRewards = tasks.reduce((sum, task) => sum + parseInt(task.reward.replace('$', '')), 0);

  return (
    <PageLayout user={user} navigation={navigation}>
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
              <div className="text-3xl font-bold text-[#3C6E57] mb-2">{totalTasks}</div>
              <div className="text-[#2E5744]/80">Total Tasks</div>
            </Card>
            <Card padding="lg" className="text-center">
              <div className="text-3xl font-bold text-[#74A27E] mb-2">{completedTasks}</div>
              <div className="text-[#2E5744]/80">Completed</div>
            </Card>
            <Card padding="lg" className="text-center">
              <div className="text-3xl font-bold text-[#9A7FF5] mb-2">{inProgressTasks}</div>
              <div className="text-[#2E5744]/80">In Progress</div>
            </Card>
            <Card padding="lg" className="text-center">
              <div className="text-3xl font-bold text-[#FFD972] mb-2">${totalRewards}</div>
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
          
          {/* Additional Demo Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <h3 className="text-xl font-bold text-[#3C6E57] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar size="sm" fallback="S" gradient="green" />
                  <span className="text-[#2E5744]">Sarah completed "Take Out Trash"</span>
                  <Badge variant="green" size="sm">+$5</Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar size="sm" fallback="A" gradient="purple" />
                  <span className="text-[#2E5744]">Alex completed "Clean Bathroom"</span>
                  <Badge variant="green" size="sm">+$20</Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar size="sm" fallback="J" gradient="warm" />
                  <span className="text-[#2E5744]">John started "Clean Kitchen"</span>
                  <Badge variant="purple" size="sm">In Progress</Badge>
                </div>
              </div>
            </Card>
            
            <Card padding="lg">
              <h3 className="text-xl font-bold text-[#3C6E57] mb-4">Component Features</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#2E5744] mb-2">✨ What you're seeing:</h4>
                  <ul className="text-sm text-[#2E5744]/80 space-y-1">
                    <li>• Reusable Table component with custom data</li>
                    <li>• Consistent Card components for layout</li>
                    <li>• Badge components with different variants</li>
                    <li>• Avatar components with fallback text</li>
                    <li>• Button components with various styles</li>
                    <li>• Responsive grid layouts</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#E9D8C5]">
                  <p className="text-sm text-[#2E5744]/80">
                    This entire dashboard is built using the reusable component system, 
                    demonstrating consistency and maintainability across complex layouts.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
} 