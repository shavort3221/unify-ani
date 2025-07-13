import React, { useState, useEffect } from 'react';
import { Trophy, Check, X, Award, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  question: string;
  fromValue: number;
  fromUnit: string;
  toUnit: string;
  answer: number;
  tolerance: number;
}

interface Reward {
  type: 'kudos' | 'points' | 'sticker';
  value: number;
  label: string;
  icon: React.ReactNode;
}

const DailyChallenge: React.FC = () => {
  const [userGuess, setUserGuess] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  
  // Get a random challenge on every refresh
  const getRandomChallenge = (): Challenge => {
    const challenges = [
      {
        question: "How many kilometers are in 5 miles?",
        fromValue: 5,
        fromUnit: "miles",
        toUnit: "kilometers",
        answer: 8.04672,
        tolerance: 0.5
      },
      {
        question: "Convert 30°C to Fahrenheit",
        fromValue: 30,
        fromUnit: "°C",
        toUnit: "°F",
        answer: 86,
        tolerance: 2
      },
      {
        question: "How many kilograms are in 150 pounds?",
        fromValue: 150,
        fromUnit: "pounds",
        toUnit: "kilograms",
        answer: 68.0389,
        tolerance: 2
      },
      {
        question: "Convert 10 feet to meters",
        fromValue: 10,
        fromUnit: "feet",
        toUnit: "meters",
        answer: 3.048,
        tolerance: 0.1
      },
      {
        question: "How many milliliters are in 2 cups?",
        fromValue: 2,
        fromUnit: "cups",
        toUnit: "milliliters",
        answer: 473.18,
        tolerance: 5
      },
      {
        question: "Convert 80°F to Celsius",
        fromValue: 80,
        fromUnit: "°F",
        toUnit: "°C",
        answer: 26.67,
        tolerance: 1
      },
      {
        question: "How many square meters are in 100 square feet?",
        fromValue: 100,
        fromUnit: "square feet",
        toUnit: "square meters",
        answer: 9.29,
        tolerance: 0.5
      },
      {
        question: "Convert 5 kg to pounds",
        fromValue: 5,
        fromUnit: "kg",
        toUnit: "pounds",
        answer: 11.023,
        tolerance: 0.5
      }
    ];
    
    // Get a random challenge
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
  };
  
  // Generate a random reward for the user
  const generateReward = (): Reward => {
    const rewards: Reward[] = [
      { type: 'kudos', value: 1, label: 'Kudos Badge', icon: <Trophy size={24} className="text-amber-500" /> },
      { type: 'points', value: 50, label: '50 Points', icon: <Award size={24} className="text-blue-500" /> },
      { type: 'points', value: 100, label: '100 Points', icon: <Award size={24} className="text-sky-500" /> },
      { type: 'sticker', value: 1, label: 'Digital Sticker', icon: <Gift size={24} className="text-red-500" /> }
    ];
    
    // The longer the streak, the better the rewards
    let availableRewards = rewards;
    if (streak >= 5) {
      // Higher chance for better rewards with higher streaks
      availableRewards = [...rewards, rewards[2], rewards[3]];
    }
    
    const randomIndex = Math.floor(Math.random() * availableRewards.length);
    return availableRewards[randomIndex];
  };
  
  const saveUserRewards = (reward: Reward) => {
    // Save user rewards to localStorage
    const userRewards = JSON.parse(localStorage.getItem('userRewards') || '{"points": 0, "kudos": 0, "stickers": 0}');
    
    switch (reward.type) {
      case 'points':
        userRewards.points += reward.value;
        break;
      case 'kudos':
        userRewards.kudos += reward.value;
        break;
      case 'sticker':
        userRewards.stickers += reward.value;
        break;
    }
    
    localStorage.setItem('userRewards', JSON.stringify(userRewards));
    setTotalPoints(userRewards.points);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChallenge) return;
    
    const guess = parseFloat(userGuess);
    const difference = Math.abs(guess - currentChallenge.answer);
    
    if (difference <= currentChallenge.tolerance) {
      // Generate a reward for the user
      const reward = generateReward();
      setCurrentReward(reward);
      saveUserRewards(reward);
      
      toast({
        title: "🎉 Correct!",
        description: `You earned ${reward.label}! Your streak is now ${streak + 1}.`,
      });
      
      setShowReward(true);
      setStreak(prev => prev + 1);
      localStorage.setItem('conversionStreak', String(streak + 1));
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer was ${currentChallenge.answer.toFixed(2)} ${currentChallenge.toUnit}. Try again with a new challenge!`,
        variant: "destructive"
      });
      setStreak(0);
      localStorage.setItem('conversionStreak', '0');
    }
    
    setHasSubmitted(true);
  };
  
  const handleNewChallenge = () => {
    setUserGuess('');
    setHasSubmitted(false);
    setShowReward(false);
    setCurrentReward(null);
    setCurrentChallenge(getRandomChallenge());
  };
  
  useEffect(() => {
    // Get a random challenge on initial load
    setCurrentChallenge(getRandomChallenge());
    
    const savedStreak = localStorage.getItem('conversionStreak');
    const userRewards = JSON.parse(localStorage.getItem('userRewards') || '{"points": 0, "kudos": 0, "stickers": 0}');
    
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
    
    setTotalPoints(userRewards.points);
  }, []);
  
  if (!currentChallenge) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-16 mb-24">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 font-medium text-sm">
          <Trophy size={16} className="animate-pulse" />
          Conversion Challenge
        </span>
        <h3 className="text-2xl font-sans font-bold mt-2 mb-1">Test Your Conversion Skills!</h3>
        <p className="text-muted-foreground">New challenge every time</p>
      </div>
      
      <div className="glass p-6 rounded-xl animate-card">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium flex items-center gap-2">
            <span>Current Streak: {streak} {streak > 0 && '🔥'}</span>
            {totalPoints > 0 && (
              <span className="ml-2 flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs animate-pulse-subtle">
                <Award size={14} /> {totalPoints} pts
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="text-lg font-medium mb-6 text-center">
          {currentChallenge.question}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              step="any"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 px-4 py-2 rounded-lg bg-background border animate-input focus-ring"
              disabled={hasSubmitted}
            />
            <span className="flex items-center text-muted-foreground">
              {currentChallenge.toUnit}
            </span>
          </div>
          
          {!hasSubmitted ? (
            <button
              type="submit"
              disabled={!userGuess}
              className={cn(
                "w-full py-2 rounded-lg font-medium animate-button",
                userGuess
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNewChallenge}
              className="w-full py-2 rounded-lg font-medium animate-button bg-green-500 text-white hover:bg-green-600"
            >
              Try A New Challenge
            </button>
          )}
        </form>
        
        {hasSubmitted && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            The correct answer was: {currentChallenge.answer.toFixed(2)} {currentChallenge.toUnit}
          </div>
        )}
        
        {showReward && currentReward && (
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 border border-sky-100 dark:border-sky-800 text-center animate-fade-in animate-card">
            <div className="flex justify-center mb-2">
              {currentReward.icon}
            </div>
            <h4 className="font-medium text-lg mb-1">Congratulations!</h4>
            <p>You earned: {currentReward.label}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Keep your streak going for even better rewards!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;