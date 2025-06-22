import { 
  PageLayout, 
  Section, 
  Badge, 
  Button, 
  FeatureCard, 
  FAQItem 
} from '../../components';

export default function Demo() {
  // Example user data (would come from your auth system)
  const user = null; // Set to user object when logged in
  
  // Custom navigation if needed
  const navigation = [
    { href: "/", label: "Home" },
    { href: "/demo", label: "Demo" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" }
  ];
  
  // Features data
  const features = [
    {
      icon: "📋",
      title: "Create Tasks",
      description: "Post household tasks with clear descriptions and reward amounts. Set deadlines and requirements for completion.",
      gradient: "default"
    },
    {
      icon: "💰", 
      title: "Earn Rewards",
      description: "Complete tasks to earn money from your shared household fund. Track your earnings and contributions over time.",
      gradient: "green"
    },
    {
      icon: "🏠",
      title: "Stay Organized", 
      description: "Keep everyone accountable with clear task assignments and progress tracking. Build better household habits together.",
      gradient: "purple"
    }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How does the reward system work?",
      answer: "Each household creates a shared fund where everyone contributes. When you complete tasks, you earn money that can be withdrawn from this fund."
    },
    {
      question: "What makes QuestFlat different?",
      answer: "Unlike other task apps, QuestFlat uses real financial incentives to create lasting behavioral change in shared living spaces."
    },
    {
      question: "Is it secure?", 
      answer: "Yes! We use bank-level security and trusted payment providers to ensure your shared fund and personal information are always protected."
    }
  ];

  return (
    <PageLayout user={user} navigation={navigation}>
      {/* Hero Section */}
      <Section background="warm" padding="xl" containerSize="lg">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-[#3C6E57] mb-6 leading-tight">
              QuestFlat
            </h1>
            <Badge variant="solid" size="lg">
              Component Demo
            </Badge>
          </div>
          
          <div className="mb-12 space-y-3 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#E9D8C5] max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-[#3C6E57] font-medium leading-relaxed">
              This page demonstrates the new reusable component system in action.
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              Notice how clean and maintainable the code becomes with proper component organization.
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              All styling is consistent and components are easily reusable across pages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" size="lg" href="/signup">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" href="/login">
              Sign In
            </Button>
            <Button variant="outline" size="lg" href="/dashboard">
              View Dashboard
            </Button>
          </div>
        </div>
      </Section>

      {/* Component Showcase */}
      <Section background="default" padding="default">
        <div className="text-center mb-16">
          <Badge variant="purple" size="lg" className="mb-4">
            Component Showcase
          </Badge>
          <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
            Built with Reusable Components
          </h3>
          <p className="text-xl text-[#2E5744]/80 max-w-3xl mx-auto leading-relaxed">
            Every element on this page uses our new component system for consistency and maintainability
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center space-y-4">
            <Badge variant="default">Button Variants</Badge>
            <div className="space-y-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="outline" size="sm">Outline</Button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Badge variant="purple">Badge Variants</Badge>
            <div className="space-y-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="green">Green</Badge>
              <Badge variant="pink">Pink</Badge>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Badge variant="pink">Button Sizes</Badge>
            <div className="space-y-2">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Badge variant="green">Badge Sizes</Badge>
            <div className="space-y-2">
              <Badge variant="solid" size="sm">Small</Badge>
              <Badge variant="solid" size="md">Medium</Badge>
              <Badge variant="solid" size="lg">Large</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" background="gradient" padding="default">
        <div className="text-center mb-16">
          <Badge variant="purple" size="lg" className="mb-4">
            How It Works
          </Badge>
          <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
            Simple Task Management
          </h3>
          <p className="text-xl text-[#2E5744]/80 max-w-3xl mx-auto leading-relaxed">
            Transform your shared living space with an organized task system that rewards contribution
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" background="default" padding="default" containerSize="sm">
        <div className="text-center mb-16">
          <Badge variant="pink" size="lg" className="mb-4">
            Common Questions
          </Badge>
          <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
            Frequently Asked Questions
          </h3>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0} // First item open by default
            />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
} 