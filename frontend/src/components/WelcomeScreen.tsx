import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Users, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onJoinRoom: (roomCode: string, playerName: string) => void;
  onCreateRoom: (roomName: string, playerName: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onJoinRoom, onCreateRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    if (roomCode.trim() && playerName.trim()) {
      onJoinRoom(roomCode.trim(), playerName.trim());
    }
  };

  const handleCreateRoom = () => {
    if (roomName.trim() && playerName.trim()) {
      onCreateRoom(roomName.trim(), playerName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cream-50 via-pink-50 to-sage-100">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-2 border-sage-200 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Home className="w-12 h-12 text-sage-600" />
              <Sparkles className="w-6 h-6 text-lavender-500 absolute -top-1 -right-1 fairy-sparkle" />
            </div>
          </div>
          <CardTitle className="text-3xl font-fredoka font-bold text-sage-800 mb-2">
            QuestFlat
          </CardTitle>
          <CardDescription className="text-lg text-sage-600 font-medium">
            Turn chores into epic quests! ✨
          </CardDescription>
          <div className="text-sm text-sage-500 mt-2 italic">
            Meet Spryte, your magical quest fairy guide!
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="join" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-sage-100 border border-sage-200">
              <TabsTrigger 
                value="join" 
                className="font-fredoka data-[state=active]:bg-sage-200 data-[state=active]:text-sage-800"
              >
                Join Room
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="font-fredoka data-[state=active]:bg-sage-200 data-[state=active]:text-sage-800"
              >
                Create Room
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="join" className="space-y-4">
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="border-2 border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-lg bg-cream-50/50"
                />
                <Input
                  placeholder="Room invite code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="border-2 border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-lg bg-cream-50/50"
                />
                <Button
                  onClick={handleJoinRoom}
                  disabled={!roomCode.trim() || !playerName.trim()}
                  className="w-full quest-button"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Quest Party
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="create" className="space-y-4">
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="border-2 border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-lg bg-cream-50/50"
                />
                <Input
                  placeholder="House name (e.g., Cozy Cottage)"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="border-2 border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-lg bg-cream-50/50"
                />
                <Button
                  onClick={handleCreateRoom}
                  disabled={!roomName.trim() || !playerName.trim()}
                  className="w-full quest-button"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Create Quest House
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-3 cozy-accent rounded-lg">
            <p className="text-sm text-sage-700 text-center font-medium">
              💡 Complete chores, earn XP, get real rewards!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
