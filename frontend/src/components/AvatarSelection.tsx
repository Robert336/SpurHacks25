import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const avatars: Avatar[] = [
  {
    id: 'broom-bard',
    name: 'Bard of the Broom',
    description: 'Master of sweeping melodies and spotless floors',
    emoji: '🧹🎵',
    color: 'bg-sage-100'
  },
  {
    id: 'dish-knight',
    name: 'Knight of the Kitchen',
    description: 'Valiant defender against dirty dishes',
    emoji: '🍽️⚔️',
    color: 'bg-terracotta-100'
  },
  {
    id: 'laundry-mage',
    name: 'Laundry Mage',
    description: 'Weaver of fresh-scented fabric spells',
    emoji: '👕✨',
    color: 'bg-pink-200'
  },
  {
    id: 'vacuum-ranger',
    name: 'Vacuum Ranger',
    description: 'Silent guardian of carpet cleanliness',
    emoji: '🏹🧽',
    color: 'bg-lavender-100'
  },
  {
    id: 'bathroom-paladin',
    name: 'Bathroom Paladin',
    description: 'Holy warrior against grime and chaos',
    emoji: '🛁⚡',
    color: 'bg-gold-100'
  },
  {
    id: 'garden-druid',
    name: 'Garden Druid',
    description: 'Nature whisperer and plant caretaker',
    emoji: '🌱🍃',
    color: 'bg-cream-200'
  }
];

interface AvatarSelectionProps {
  onSelectAvatar: (avatar: Avatar) => void;
  playerName: string;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelectAvatar, playerName }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleConfirmSelection = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cream-50 via-pink-50 to-sage-100">
      <Card className="w-full max-w-4xl bg-card/95 backdrop-blur-sm border-2 border-sage-200 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-fredoka font-bold text-sage-800 mb-2">
            Choose Your Quest Class
          </CardTitle>
          <CardDescription className="text-lg text-sage-600">
            Welcome, {playerName}! Pick your magical household specialty ✨
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`avatar-card ${selectedAvatar?.id === avatar.id ? 'selected' : ''} ${avatar.color} hover:scale-105 transition-transform`}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{avatar.emoji}</div>
                  <h3 className="font-fredoka font-semibold text-lg text-sage-800 mb-2">
                    {avatar.name}
                  </h3>
                  <p className="text-sm text-sage-600 leading-relaxed">
                    {avatar.description}
                  </p>
                  {selectedAvatar?.id === avatar.id && (
                    <CheckCircle className="w-6 h-6 text-sage-500 mx-auto mt-3" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedAvatar}
              className="quest-button px-8"
              size="lg"
            >
              Begin Your Quest Journey!
            </Button>
          </div>
          
          <div className="mt-6 p-4 cozy-accent rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sage-700">
              <span className="text-2xl">🧚‍♀️</span>
              <p className="text-sm font-medium italic">
                "Choose wisely, dear adventurer! Each class brings unique charm to your questing journey." - Spryte
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvatarSelection;
