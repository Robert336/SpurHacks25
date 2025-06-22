import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      {/* Header/Navigation */}
      <header className="relative z-10 bg-gradient-to-r from-[#FFF4E6] to-[#E9D8C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Left Navigation */}
            <nav className="flex space-x-8">
              <Link href="/" className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10">
                Home
              </Link>
              <Link href="#features" className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10">
                Features
              </Link>
              <Link href="#faq" className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10">
                FAQ
              </Link>
            </nav>

            {/* Center Logo */}
            <div className="bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] px-8 py-3 rounded-2xl shadow-lg">
              <span className="text-white font-bold text-xl">QuestFlat</span>
            </div>

            {/* Right User Section */}
            <div className="flex items-center space-x-4">
              <span className="text-[#3C6E57] font-medium">Guest</span>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD972] to-[#D4A6A6] rounded-full flex items-center justify-center shadow-md">
                <span className="text-lg">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4E6] via-[#E9D8C5] to-[#FFF4E6]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-[#3C6E57] mb-6 leading-tight">
              QuestFlat
            </h1>
            <div className="inline-block bg-[#FFD972]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-lg text-[#2E5744] font-medium">Household Task Management</span>
            </div>
          </div>
          
          <div className="mb-12 space-y-3 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#E9D8C5]">
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
            <Link 
              href="/signup"
              className="px-10 py-4 text-[#2E2E2E] text-xl font-bold rounded-full shadow-xl border-4 border-white/50"
            >
              Get Started
            </Link>
            <Link 
              href="/login"
              className="px-10 py-4 bg-white/80 backdrop-blur-sm text-[#3C6E57] text-xl font-bold rounded-full shadow-xl border-4 border-[#9A7FF5]/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-[#E9D8C5] to-[#FFF4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A7FF5]/20 px-6 py-2 rounded-full mb-4">
              <span className="text-lg text-[#2E5744] font-medium">How It Works</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
              Simple Task Management
            </h3>
            <p className="text-xl text-[#2E5744]/80 max-w-3xl mx-auto leading-relaxed">
              Transform your shared living space with an organized task system that rewards contribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5]">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFD972] to-[#9A7FF5] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📋</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Create Tasks</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Post household tasks with clear descriptions and reward amounts. Set deadlines and requirements for completion.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5]">
              <div className="w-24 h-24 bg-gradient-to-br from-[#74A27E] to-[#D4A6A6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">💰</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Earn Rewards</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Complete tasks to earn money from your shared household fund. Track your earnings and contributions over time.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5]">
              <div className="w-24 h-24 bg-gradient-to-br from-[#9A7FF5] to-[#FFD972] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🏠</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Stay Organized</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Keep everyone accountable with clear task assignments and progress tracking. Build better household habits together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#FFF4E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#D4A6A6]/20 px-6 py-2 rounded-full mb-4">
              <span className="text-lg text-[#2E5744] font-medium">Common Questions</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
              Frequently Asked Questions
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5]">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3">
                How does the reward system work?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Each household creates a shared fund where everyone contributes. When you complete tasks, you earn money that can be withdrawn from this fund.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5]">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3">
                What makes QuestFlat different?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Unlike other task apps, QuestFlat uses real financial incentives to create lasting behavioral change in shared living spaces.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5]">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3">
                Is it secure?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Yes! We use bank-level security and trusted payment providers to ensure your shared fund and personal information are always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#3C6E57] to-[#2E5744] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#FFF4E6]/90 text-lg leading-relaxed">
            © 2024 QuestFlat. Making household management simple and fair.
          </p>
        </div>
      </footer>
    </div>
  );
}
