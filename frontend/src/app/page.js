import { 
  PageLayout, 
  Section, 
  Badge, 
  Button, 
  FeatureCard, 
  FAQItem 
} from '../components';

export default function HomeRefactored() {
  // Example user data (would come from your auth system)
  const user = null; // Set to user object when logged in
  
  // Custom navigation if needed
  const navigation = [
    { href: "/", label: "Home" },
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
            <Badge variant="default" size="lg">
              Household Task Management
            </Badge>
          </div>
          
          <div className="mb-12 space-y-3 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#E9D8C5] max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-[#3C6E57] font-medium leading-relaxed">
              Turn household chores into rewarding tasks with real financial incentives.
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              Create tasks, earn rewards from your shared household fund,
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              and make living together more organized and fair.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" size="lg" href="/signup">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" href="/login">
              Sign In
            </Button>
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