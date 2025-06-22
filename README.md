# QuestFlat 🏡✨

**Turn household chores into epic adventures!**

QuestFlat is a gamified household management platform that transforms mundane cleaning tasks into exciting RPG-style quests. Built with a cozy cottagecore aesthetic, it makes household management fun, collaborative, and rewarding.

![QuestFlat Banner](docs/banner-placeholder.png) <!-- Add your banner image here -->

## 🌟 Features

### 🎮 **Gamification System**
- **RPG-Style Avatars**: Choose from magical household classes like "Bard of the Broom" or "Knight of the Kitchen"
- **XP & Leveling**: Earn experience points for completing tasks and level up your character
- **Quest System**: Transform chores into epic quests with difficulty ratings and time estimates
- **Photo Proof**: Upload completion photos to verify quest completion

### 🏠 **Room-Based Collaboration**
- **Quest Houses**: Create or join household "quest houses" with unique room codes
- **Party System**: Invite family members or housemates to your quest party
- **Leaderboards**: Track progress and compete with your housemates
- **Real-Time Updates**: See everyone's progress in real-time

### 💰 **Real Rewards**
- **Quest Wallet**: Convert XP into real money (100 XP = $5.00)
- **Cash Out System**: Minimum $5 payout via Stripe integration
- **Achievement Tracking**: Monitor completed quests and earnings

### 🎨 **Cozy Design**
- **Cottagecore Aesthetic**: Warm, earthy tones with soft watercolor-inspired design
- **Whimsical UI**: Meet Spryte, your magical quest fairy guide
- **Mobile-First**: Responsive design that works on all devices

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom cottagecore color palette
- **Shadcn/ui** for beautiful, accessible components
- **React Router** for navigation
- **TanStack Query** for state management
- **Lucide React** for icons

### **Backend**
- **Python** with modern async frameworks
- **SQLAlchemy** for database management
- **Authentication** system with secure user management
- **RESTful API** architecture

### **Tools & Deployment**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Git** for version control
- **Deployment** configurations included

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SpurHacks25.git
   cd SpurHacks25/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database**
   ```bash
   python setup_database.py
   ```

5. **Start the server**
   ```bash
   python app.py
   ```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

QuestFlat embraces a **cozy cottagecore aesthetic** that feels like a warm hug. Our design language includes:

### **Color Palette**
- **Warm Earthy Tones**: Creams (`#FFF4E6`), soft peaches, muted reds (`#D4A6A6`), and forest greens (`#3C6E57`)
- **Playful Pops**: Lavender (`#9A7FF5`), bright yellow (`#FFD972`), and pink (`#E9D8C5`)
- **Natural Muted Tones**: Grounded, rustic colors that evoke low-tech comfort
- **Pixel Neutrals**: Clean greys (`#2E2E2E`) for structure without coldness

### **Visual Style**
- **Soft Illustrations**: Watercolor-inspired elements with subtle shading
- **Rounded Forms**: Gentle, family-friendly shapes
- **Storybook Aesthetic**: Your household becomes a "cozy village" where everyone contributes

### **Typography**
- **Fredoka**: Playful, rounded font for headers and UI elements
- **Inter**: Clean, readable font for body text
- **Pixel Touches**: Subtle retro computer UI elements for nostalgic charm

## 📁 Project Structure

```
SpurHacks25/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── ...
│   ├── public/              # Static assets
│   └── ...
├── backend/                 # Python backend application
│   ├── app/                 # Application modules
│   │   ├── authentication.py
│   │   └── opentasks.py
│   └── database_schema.sql
├── docs/                    # Documentation
│   ├── design-language.md
│   ├── MVP-Features.md
│   └── ...
├── deployment/              # Deployment configurations
└── README.md
```


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎪 Demo

Try out QuestFlat live: [Demo Link](https://questflat-demo.vercel.app) *(Coming Soon)*

## 📸 Screenshots

| Welcome Screen | Avatar Selection | Quest Dashboard |
|----------------|------------------|-----------------|
| ![Welcome](docs/screenshots/welcome.png) | ![Avatar](docs/screenshots/avatar.png) | ![Dashboard](docs/screenshots/dashboard.png) |

## 🏆 SpurHacks 2025

This project was created for SpurHacks 2025, focusing on innovative solutions for everyday problems. QuestFlat addresses the universal challenge of household management by making it engaging, collaborative, and rewarding.

### **Problem Statement**
Household chores are often seen as mundane, leading to conflicts and uneven distribution of work among housemates and family members.

### **Our Solution**
Transform household management into an engaging RPG experience where everyone wants to participate, complete with real rewards and a beautiful, cozy interface.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Lucide** for the amazing icon set
- **Tailwind CSS** for the utility-first CSS framework
- **SpurHacks 2025** for the inspiration and platform

## 📧 Contact

**Team QuestFlat**
- Email: contact@questflat.app
- GitHub: [SpurHacks25](https://github.com/yourusername/SpurHacks25)

---

*"Every great adventure begins with a single quest!" - Spryte 🧚‍♀️*