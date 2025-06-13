import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, PartyPopper, Play } from "lucide-react";

interface WinnerDisplayProps {
  winner: 'X' | 'O' | null;
  onNewGame: () => void;
}

export const WinnerDisplay = ({ winner, onNewGame }: WinnerDisplayProps) => {
  const isDraw = winner === null;

  return (
    <Card className={`p-6 animate-slide-in ${
      isDraw 
        ? 'bg-game-surface/50 border-neon-orange/50' 
        : 'bg-game-surface/50 border-neon-green/50'
    } backdrop-blur-sm neon-border`}>
      <div className="text-center space-y-4">
        {/* Winner Icon */}
        <div className="flex justify-center mb-4">
          {isDraw ? (
            <Star className="text-neon-orange animate-glow-pulse" size={48} />
          ) : (
            <Trophy className="text-neon-green animate-winner-celebration" size={48} />
          )}
        </div>

        {/* Winner Title */}
        <h2 className={`text-3xl font-bold animate-glow-pulse ${
          isDraw ? 'text-neon-orange' : 'text-neon-green'
        }`}>
          {isDraw ? 'Match Nul!' : 'Victoire!'}
        </h2>

        {/* Winner Display */}
        {!isDraw && (
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">Le gagnant est:</p>
            <div className={`text-6xl font-bold animate-winner-celebration ${
              winner === 'X' ? 'cell-x' : 'cell-o'
            }`}>
              {winner}
            </div>
          </div>
        )}

        {isDraw && (
          <p className="text-lg text-muted-foreground">
            Belle bataille! Personne n'a gagné cette fois.
          </p>
        )}

        {/* Celebration Message */}
        <div className="space-y-2">
          <div className="flex justify-center gap-2">
            <PartyPopper className="text-neon-pink animate-neon-flicker" size={20} />
            <PartyPopper className="text-neon-cyan animate-neon-flicker" size={20} />
            <PartyPopper className="text-neon-purple animate-neon-flicker" size={20} />
          </div>
          
          <p className="text-sm text-muted-foreground italic">
            {isDraw 
              ? "Tentez votre chance à nouveau!"
              : "Félicitations pour cette victoire épique!"
            }
          </p>
        </div>

        {/* New Game Button */}
        <Button
          onClick={onNewGame}
          className="w-full bg-neon-green/20 hover:bg-neon-green/30 border-neon-green text-neon-green neon-border transition-all duration-300 mt-6"
          size="lg"
        >
          <Play className="mr-2 h-5 w-5" />
          Rejouer
        </Button>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mt-4 opacity-60">
          <Star className="text-neon-cyan animate-neon-flicker" size={16} />
          <Star className="text-neon-pink animate-neon-flicker" size={16} />
          <Star className="text-neon-purple animate-neon-flicker" size={16} />
          <Star className="text-neon-green animate-neon-flicker" size={16} />
        </div>
      </div>
    </Card>
  );
};