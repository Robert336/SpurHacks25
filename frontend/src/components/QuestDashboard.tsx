import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Trophy, Coins, Users, Star, CheckCircle, Clock } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  emoji: string;
  timeEstimate: string;
  completed: boolean;
  photoProof?: string;
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  completedQuests: number;
}

interface QuestDashboardProps {
  player: Player;
  roomName: string;
  roomCode: string;
  onLogout: () => void;
}

const sampleQuests: Quest[] = [
  {
    id: '1',
    title: 'Kitchen Kingdom Cleanup',
    description: 'Wash all dishes, wipe counters, and sweep the floor',
    xp: 150,
    difficulty: 'Medium',
    category: 'Kitchen',
    emoji: '🍽️',
    timeEstimate: '30 min',
    completed: false
  },
  {
    id: '2',
    title: 'Bathroom Blessing Ritual',
    description: 'Deep clean toilet, shower, sink, and mirror',
    xp: 200,
    difficulty: 'Hard',
    category: 'Bathroom',
    emoji: '🛁',
    timeEstimate: '45 min',
    completed: false
  },
  {
    id: '3',
    title: 'Living Room Harmony',
    description: 'Vacuum carpet, dust surfaces, organize items',
    xp: 120,
    difficulty: 'Easy',
    category: 'Living Room',
    emoji: '🛋️',
    timeEstimate: '25 min',
    completed: true,
    photoProof: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04'
  }
];

const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Alex',
    avatar: '🧹🎵',
    xp: 1250,
    level: 5,
    completedQuests: 8
  },
  {
    id: '2',
    name: 'Sam',
    avatar: '🍽️⚔️',
    xp: 980,
    level: 4,
    completedQuests: 6
  },
  {
    id: '3',
    name: 'Morgan',
    avatar: '👕✨',
    xp: 750,
    level: 3,
    completedQuests: 5
  }
];

const QuestDashboard: React.FC<QuestDashboardProps> = ({ player, roomName, roomCode, onLogout }) => {
  const [quests, setQuests] = useState<Quest[]>(sampleQuests);
  const [players] = useState<Player[]>(samplePlayers);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handlePhotoUpload = (questId: string) => {
    console.log('Photo upload for quest:', questId);
    // Mock photo upload - in real app would handle actual photo upload
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, completed: true, photoProof: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' }
        : quest
    ));
    setSelectedQuest(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const walletBalance = Math.floor(player.xp / 100) * 5; // $5 for every 100 XP

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50 to-sage-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-fredoka font-bold text-sage-800 mb-2">
                {roomName} Quest House
              </h1>
              <p className="text-sage-600">Room Code: <span className="font-mono font-semibold bg-sage-100 px-2 py-1 rounded">{roomCode}</span></p>
            </div>
            <Button onClick={onLogout} variant="outline" className="border-sage-300 hover:bg-sage-50">
              Leave House
            </Button>
          </div>
          
          {/* Player Stats */}
          <Card className="bg-gradient-to-r from-pink-100 to-lavender-100 border-2 border-sage-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{player.avatar}</div>
                  <div>
                    <h2 className="text-xl font-fredoka font-semibold text-sage-800">
                      {player.name}
                    </h2>
                    <p className="text-sage-600">Level {player.level} Adventurer</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="xp-badge">{player.xp} XP</div>
                    <p className="text-xs text-sage-600 mt-1">Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="reward-badge">
                      ${walletBalance}
                    </div>
                    <p className="text-xs text-sage-600 mt-1">Earnings</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="quests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-sage-100 border border-sage-200">
            <TabsTrigger 
              value="quests" 
              className="font-fredoka data-[state=active]:bg-sage-200 data-[state=active]:text-sage-800"
            >
              Active Quests
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className="font-fredoka data-[state=active]:bg-sage-200 data-[state=active]:text-sage-800"
            >
              Party Leaderboard
            </TabsTrigger>
            <TabsTrigger 
              value="wallet" 
              className="font-fredoka data-[state=active]:bg-sage-200 data-[state=active]:text-sage-800"
            >
              Quest Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quests.map((quest) => (
                <Card key={quest.id} className={`quest-card ${quest.completed ? 'opacity-75' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{quest.emoji}</span>
                      <Badge className={getDifficultyColor(quest.difficulty)}>
                        {quest.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-fredoka font-semibold text-sage-800">
                      {quest.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-sage-600">
                      {quest.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm text-sage-600">
                        <Clock className="w-4 h-4" />
                        <span>{quest.timeEstimate}</span>
                      </div>
                      <div className="xp-badge text-xs">+{quest.xp} XP</div>
                    </div>
                    
                    {quest.completed ? (
                      <div className="flex items-center space-x-2 text-sage-600">
                        <CheckCircle className="w-5 h-5 text-sage-500" />
                        <span className="text-sm font-medium">Quest Completed!</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setSelectedQuest(quest)}
                        className="w-full quest-button"
                        size="sm"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Complete Quest
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="bg-card/90 backdrop-blur-sm border-2 border-sage-200">
              <CardHeader>
                <CardTitle className="font-fredoka font-bold text-sage-800 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-gold-300" />
                  Party Leaderboard
                </CardTitle>
                <CardDescription className="text-sage-600">See how your quest party is performing!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players
                    .sort((a, b) => b.xp - a.xp)
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between p-3 bg-cream-50 border border-sage-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-gold-300 text-neutral-800' : 
                            index === 1 ? 'bg-sage-300 text-sage-800' : 
                            'bg-terracotta-300 text-terracotta-800'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-2xl">{player.avatar}</span>
                          <div>
                            <p className="font-semibold text-sage-800">{player.name}</p>
                            <p className="text-sm text-sage-600">Level {player.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="xp-badge text-xs">{player.xp} XP</div>
                          <p className="text-xs text-sage-600 mt-1">{player.completedQuests} quests</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <Card className="bg-card/90 backdrop-blur-sm border-2 border-sage-200">
              <CardHeader>
                <CardTitle className="font-fredoka font-bold text-sage-800 flex items-center">
                  <Coins className="w-6 h-6 mr-2 text-gold-300" />
                  Quest Wallet
                </CardTitle>
                <CardDescription className="text-sage-600">Convert your XP into real rewards!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-gold-100 to-gold-200 rounded-xl border border-gold-300">
                  <div className="text-4xl font-fredoka font-bold text-neutral-800 mb-2">
                    ${walletBalance}.00
                  </div>
                  <p className="text-neutral-700">Available to cash out</p>
                  <p className="text-sm text-neutral-600 mt-2">
                    Based on {player.xp} XP (${(player.xp / 100 * 5).toFixed(2)} earned)
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-sage-100 border border-sage-200 rounded-lg">
                    <span className="text-sage-700">XP Conversion Rate</span>
                    <span className="font-semibold text-sage-800">100 XP = $5.00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-100 border border-pink-200 rounded-lg">
                    <span className="text-sage-700">Next Payout Level</span>
                    <span className="font-semibold text-sage-800">
                      {Math.ceil(player.xp / 100) * 100} XP
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full quest-button"
                  disabled={walletBalance < 5}
                  size="lg"
                >
                  <Coins className="w-5 h-5 mr-2" />
                  Cash Out ${walletBalance}
                </Button>
                
                <p className="text-xs text-sage-600 text-center">
                  Minimum cash out: $5.00 • Payments processed via Stripe
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Photo Upload Modal */}
        {selectedQuest && (
          <div className="fixed inset-0 bg-neutral-800/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-2 border-sage-200">
              <CardHeader>
                <CardTitle className="font-fredoka font-bold text-sage-800">
                  Complete Quest: {selectedQuest.title}
                </CardTitle>
                <CardDescription className="text-sage-600">
                  Upload a photo as proof of completion to earn {selectedQuest.xp} XP!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-sage-300 bg-sage-50/50 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                  <p className="text-sage-600 mb-4">Take a photo of your completed quest</p>
                  <Button className="quest-button">
                    <Camera className="w-4 h-4 mr-2" />
                    Open Camera
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handlePhotoUpload(selectedQuest.id)}
                    className="flex-1 quest-button"
                  >
                    Submit Proof
                  </Button>
                  <Button
                    onClick={() => setSelectedQuest(null)}
                    variant="outline"
                    className="border-sage-300 hover:bg-sage-50"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestDashboard;
