
import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import AvatarSelection from '@/components/AvatarSelection';
import QuestDashboard from '@/components/QuestDashboard';

interface Avatar {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  completedQuests: number;
}

type GameState = 'welcome' | 'avatar-selection' | 'dashboard';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);

  const handleJoinRoom = (code: string, name: string) => {
    console.log('Joining room:', code, 'as', name);
    setPlayerName(name);
    setRoomCode(code);
    setRoomName(`Room ${code}`); // In real app, would fetch actual room name
    setGameState('avatar-selection');
  };

  const handleCreateRoom = (name: string, playerName: string) => {
    console.log('Creating room:', name, 'for player:', playerName);
    setPlayerName(playerName);
    setRoomName(name);
    setRoomCode(Math.random().toString(36).substring(2, 8).toUpperCase()); // Generate random code
    setGameState('avatar-selection');
  };

  const handleSelectAvatar = (avatar: Avatar) => {
    console.log('Selected avatar:', avatar);
    const newPlayer: Player = {
      id: '1',
      name: playerName,
      avatar: avatar.emoji,
      xp: 1250,
      level: 5,
      completedQuests: 8
    };
    setPlayer(newPlayer);
    setGameState('dashboard');
  };

  const handleLogout = () => {
    setGameState('welcome');
    setPlayerName('');
    setRoomName('');
    setRoomCode('');
    setPlayer(null);
  };

  switch (gameState) {
    case 'welcome':
      return (
        <WelcomeScreen
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
        />
      );
    
    case 'avatar-selection':
      return (
        <AvatarSelection
          onSelectAvatar={handleSelectAvatar}
          playerName={playerName}
        />
      );
    
    case 'dashboard':
      return player ? (
        <QuestDashboard
          player={player}
          roomName={roomName}
          roomCode={roomCode}
          onLogout={handleLogout}
        />
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
