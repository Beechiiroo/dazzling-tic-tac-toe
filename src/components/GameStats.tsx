import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, RefreshCw } from "lucide-react";

interface GameStatsProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  currentPlayer: 'X' | 'O';
  onResetScores: () => void;
}

export const GameStats = ({ scores, currentPlayer, onResetScores }: GameStatsProps) => {
  const totalGames = scores.X + scores.O + scores.draws;

  return (
    <Card className="p-6 bg-game-surface/50 backdrop-blur-sm border-neon-green/30 neon-border animate-slide-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neon-green mb-2 animate-glow-pulse">
          <Trophy className="inline mr-2" size={24} />
          Statistiques
        </h2>
        <p className="text-muted-foreground">
          {totalGames} {totalGames === 1 ? 'partie jouée' : 'parties jouées'}
        </p>
      </div>

      <div className="space-y-4">
        {/* Player X Score */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-game-bg/50 border border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold cell-x">X</div>
            <span className="text-foreground">Joueur X</span>
          </div>
          <div className="text-2xl font-bold text-neon-cyan animate-glow-pulse">
            {scores.X}
          </div>
        </div>

        {/* Player O Score */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-game-bg/50 border border-neon-pink/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold cell-o">O</div>
            <span className="text-foreground">Joueur O</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink animate-glow-pulse">
            {scores.O}
          </div>
        </div>

        {/* Draws */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-game-bg/50 border border-neon-orange/30">
          <div className="flex items-center gap-3">
            <Users className="text-neon-orange" size={24} />
            <span className="text-foreground">Égalités</span>
          </div>
          <div className="text-2xl font-bold text-neon-orange animate-glow-pulse">
            {scores.draws}
          </div>
        </div>
      </div>

      {/* Current Player Indicator */}
      <div className="mt-6 p-4 rounded-lg bg-game-bg/30 border-2 border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Joueur actuel:</p>
          <div className={`text-3xl font-bold ${
            currentPlayer === 'X' ? 'cell-x' : 'cell-o'
          } animate-glow-pulse`}>
            {currentPlayer}
          </div>
        </div>
      </div>

      {/* Reset Scores Button */}
      {totalGames > 0 && (
        <Button
          onClick={onResetScores}
          variant="outline"
          className="w-full mt-4 border-neon-orange/50 text-neon-orange hover:bg-neon-orange/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Remettre à zéro
        </Button>
      )}
    </Card>
  );
};