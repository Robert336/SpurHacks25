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
                🏠 Home
              </Link>
              <Link href="#features" className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10">
                ✨ Features
              </Link>
              <Link href="#faq" className="text-[#3C6E57] hover:text-[#2E5744] font-medium transition-colors duration-200 px-3 py-2 rounded-full hover:bg-[#74A27E]/10">
                ❓ FAQ
              </Link>
            </nav>

            {/* Center Logo */}
            <div className="bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">🏘️ QuestFlat</span>
            </div>

            {/* Right User Section */}
            <div className="flex items-center space-x-4">
              <span className="text-[#3C6E57] font-medium">Guest</span>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD972] to-[#D4A6A6] rounded-full flex items-center justify-center shadow-md">
                <span className="text-lg">🐻</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Cozy Village Background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Whimsical Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4E6] via-[#E9D8C5] to-[#FFF4E6]">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 text-6xl animate-bounce">🌸</div>
            <div className="absolute top-40 right-32 text-5xl animate-pulse">🦋</div>
            <div className="absolute bottom-32 left-16 text-4xl animate-bounce delay-300">🌿</div>
            <div className="absolute bottom-20 right-20 text-5xl animate-pulse delay-500">🍄</div>
            <div className="absolute top-32 left-1/2 text-3xl animate-bounce delay-700">✨</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-[#3C6E57] mb-6 leading-tight drop-shadow-sm">
              QuestFlat
            </h1>
            <div className="inline-block bg-[#FFD972]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-lg text-[#2E5744] font-medium">🏘️ Your Cozy Village Awaits</span>
            </div>
          </div>
          
          <div className="mb-12 space-y-3 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#E9D8C5]">
            <p className="text-xl md:text-2xl text-[#3C6E57] font-medium leading-relaxed">
              Welcome to QuestFlat, where your household becomes a magical village! 🏠✨
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              Turn chores into cozy quests, earn real rewards from your shared treasure chest,
            </p>
            <p className="text-lg md:text-xl text-[#2E5744]/90 leading-relaxed">
              and watch your home transform into a place where everyone loves to pitch in! 🌟
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/signup"
              className="group px-10 py-4 bg-gradient-to-r from-[#FFD972] to-[#74A27E] text-[#2E2E2E] text-xl font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-white/50"
            >
              <span className="flex items-center gap-2">
                🌟 Start Your Quest
                <span className="group-hover:animate-bounce">→</span>
              </span>
            </Link>
            <Link 
              href="/login"
              className="group px-10 py-4 bg-white/80 backdrop-blur-sm text-[#3C6E57] text-xl font-bold rounded-full hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-[#9A7FF5]/30"
            >
              <span className="flex items-center gap-2">
                🏠 Return Home
                <span className="group-hover:animate-bounce">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Village Square Style */}
      <section id="features" className="py-20 bg-gradient-to-b from-[#E9D8C5] to-[#FFF4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#9A7FF5]/20 px-6 py-2 rounded-full mb-4">
              <span className="text-lg text-[#2E5744] font-medium">🗺️ Explore Your Village</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
              How QuestFlat Works
            </h3>
            <p className="text-xl text-[#2E5744]/80 max-w-3xl mx-auto leading-relaxed">
              Transform your shared living space into a magical quest hub where every chore becomes a delightful adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5] hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFD972] to-[#9A7FF5] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📋</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Create Bounty Quests</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Post cozy "bounty" quests on your village board! Each task becomes a delightful adventure with clear rewards from your shared treasure chest. 🏆
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5] hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#74A27E] to-[#D4A6A6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">💰</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Earn Real Treasures</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Complete quests to earn coins from your village treasury! Watch your personal coin pouch grow as you contribute to your cozy community. ✨
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E9D8C5] hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-[#9A7FF5] to-[#FFD972] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🏘️</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3C6E57]">Build Your Village</h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Foster harmony in your cozy village! Watch as your household transforms into a magical place where everyone loves to contribute. 🌟
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
              <span className="text-lg text-[#2E5744] font-medium">💬 Village Wisdom</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold mb-6 text-[#3C6E57]">
              Frequently Asked Questions
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5] hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                💰 How does the treasure chest work?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Each household creates a shared treasure chest where everyone contributes. When you complete quests, you earn coins that can be redeemed for real money from this magical treasury!
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5] hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                ✨ What makes QuestFlat special?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Unlike other chore apps, QuestFlat creates a cozy village atmosphere with real financial rewards and delightful gamification that makes household tasks feel like magical adventures!
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#E9D8C5] hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                🔒 Is our village treasure safe?
              </h4>
              <p className="text-[#2E5744]/80 leading-relaxed">
                Absolutely! We use enchanted security spells (bank-level encryption) and trusted payment guardians to ensure your shared treasure chest and village information are always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#3C6E57] to-[#2E5744] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-4xl">🏘️</span>
          </div>
          <p className="text-[#FFF4E6]/90 text-lg leading-relaxed">
            © 2024 QuestFlat. Making households more magical, one cozy quest at a time. ✨
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <span className="text-2xl animate-bounce">🌸</span>
            <span className="text-2xl animate-pulse">🦋</span>
            <span className="text-2xl animate-bounce delay-300">🌿</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
