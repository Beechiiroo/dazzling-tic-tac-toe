import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GameCell } from "./GameCell";
import { GameStats } from "./GameStats";
import { WinnerDisplay } from "./WinnerDisplay";
import { Sparkles, RotateCcw } from "lucide-react";

type Player = 'X' | 'O' | null;
type Board = Player[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  winningLine: number[];
  gameOver: boolean;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export const TicTacToe = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winningLine: [],
    gameOver: false,
    scores: { X: 0, O: 0, draws: 0 }
  });

  const checkWinner = (board: Board): { winner: Player; winningLine: number[] } => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: combination };
      }
    }
    return { winner: null, winningLine: [] };
  };

  const makeMove = (index: number) => {
    if (gameState.board[index] || gameState.gameOver) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      winningLine,
      gameOver: winner !== null || isDraw,
      scores: {
        ...prev.scores,
        ...(winner ? { [winner]: prev.scores[winner] + 1 } : {}),
        ...(isDraw ? { draws: prev.scores.draws + 1 } : {})
      }
    }));

    if (winner) {
      toast({
        title: `🎉 Joueur ${winner} gagne!`,
        description: "Félicitations pour cette victoire épique!",
      });
    } else if (isDraw) {
      toast({
        title: "🤝 Match nul!",
        description: "Belle bataille, tentez votre chance encore!",
      });
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: [],
      gameOver: false
    }));
  };

  const resetScores = () => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  };

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 animate-slide-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 game-title animate-neon-flicker">
            XO NEON
          </h1>
          <p className="text-neon-green text-lg md:text-xl animate-glow-pulse">
            Jeu Tic-Tac-Toe Futuriste
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Game Stats */}
          <div className="lg:order-1">
            <GameStats 
              scores={gameState.scores}
              currentPlayer={gameState.currentPlayer}
              onResetScores={resetScores}
            />
          </div>

          {/* Game Board */}
          <div className="lg:order-2">
            <Card className="p-6 bg-game-surface/50 backdrop-blur-sm border-neon-purple/30 neon-border">
              <div className="grid grid-cols-3 gap-2 mb-6">
                {gameState.board.map((cell, index) => (
                  <GameCell
                    key={index}
                    value={cell}
                    onClick={() => makeMove(index)}
                    isWinning={gameState.winningLine.includes(index)}
                    disabled={gameState.gameOver}
                  />
                ))}
              </div>

              {/* Game Controls */}
              <div className="flex flex-col gap-4">
                {!gameState.gameOver && (
                  <div className="text-center">
                    <p className="text-lg mb-2 text-foreground">
                      Tour du joueur:
                    </p>
                    <div className={`text-4xl font-bold ${
                      gameState.currentPlayer === 'X' ? 'cell-x' : 'cell-o'
                    } animate-glow-pulse`}>
                      {gameState.currentPlayer}
                    </div>
                  </div>
                )}

                <Button
                  onClick={resetGame}
                  className="w-full bg-neon-purple/20 hover:bg-neon-purple/30 border-neon-purple text-neon-purple neon-border transition-all duration-300"
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Nouvelle Partie
                </Button>
              </div>
            </Card>
          </div>

          {/* Winner Display */}
          <div className="lg:order-3">
            {gameState.gameOver && (
              <WinnerDisplay
                winner={gameState.winner}
                onNewGame={resetGame}
              />
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-10 left-10 text-neon-cyan animate-neon-flicker opacity-20">
          <Sparkles size={24} />
        </div>
        <div className="fixed top-20 right-20 text-neon-pink animate-neon-flicker opacity-20">
          <Sparkles size={32} />
        </div>
        <div className="fixed bottom-10 left-20 text-neon-green animate-neon-flicker opacity-20">
          <Sparkles size={28} />
        </div>
        <div className="fixed bottom-20 right-10 text-neon-purple animate-neon-flicker opacity-20">
          <Sparkles size={20} />
        </div>
      </div>
    </div>
  );
};