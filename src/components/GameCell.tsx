import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameCellProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export const GameCell = ({ value, onClick, isWinning, disabled }: GameCellProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (value || disabled) return;
    
    setIsAnimating(true);
    onClick();
    
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "h-20 w-20 md:h-24 md:w-24 text-4xl md:text-5xl font-bold",
        "bg-game-surface/30 hover:bg-game-surface/50",
        "border-2 transition-all duration-300",
        "backdrop-blur-sm",
        {
          // Empty cell
          "border-neon-blue/50 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/30": 
            !value && !disabled,
          
          // X player
          "border-neon-cyan cell-x animate-glow-pulse": 
            value === 'X',
          
          // O player  
          "border-neon-pink cell-o animate-glow-pulse": 
            value === 'O',
          
          // Winning animation
          "animate-winner-celebration": 
            isWinning,
          
          // Flip animation when placing
          "animate-flip": 
            isAnimating,
          
          // Disabled state
          "opacity-50 cursor-not-allowed": 
            disabled && !value
        }
      )}
    >
      <span className={cn(
        "transition-all duration-300",
        {
          "transform scale-110": isWinning,
          "animate-pulse": isWinning
        }
      )}>
        {value}
      </span>
    </Button>
  );
};