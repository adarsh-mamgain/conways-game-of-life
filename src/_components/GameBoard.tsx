"use client";
import { useState, useEffect } from "react";
import { characterPatterns } from "@/utils/characterPatterns";

const GameBoard = () => {
  const size = 30;
  const [board, setBoard] = useState<number[][]>(
    Array(size).fill(Array(size).fill(0)),
  );
  const [running, setRunning] = useState(false);
  const [name, setName] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // Function to calculate next state
  const getNextState = (board: number[][]): number[][] => {
    const newBoard = board.map((arr) => [...arr]);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const neighbours = countNeighbours(board, i, j);
        if (board[i]?.[j] === 0 && neighbours === 3) {
          newBoard[i]![j] = 1;
        } else if (board[i]?.[j] === 1 && (neighbours < 2 || neighbours > 3)) {
          newBoard[i]![j] = 0;
        }
      }
    }
    return newBoard;
  };

  // Function to count living neighbours
  const countNeighbours = (board: number[][], x: number, y: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (
          newX >= 0 &&
          newX < size &&
          newY >= 0 &&
          newY < size &&
          board[newX]?.[newY]
        ) {
          count += board[newX][newY];
        }
      }
    }
    return count;
  };

  // Handle click to toggle cell state
  const handleCellClick = (x: number, y: number) => {
    const newBoard = board.map((arr) => [...arr]);
    if (typeof newBoard[x]?.[y] !== "undefined") {
      newBoard[x][y] = board[x]?.[y] ? 0 : 1;
      setBoard(newBoard);
    }
  };

  // Start/stop the game
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setBoard((board) => getNextState(board));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [running]);

  // Generate random state
  const generateRandomState = () => {
    const newBoard = board.map((arr) =>
      arr.map(() => (Math.random() > 0.7 ? 1 : 0)),
    );
    setBoard(newBoard);
  };

  // Generate name patterns
  const writeName = (name: string) => {
    const newBoard = board.map((arr) => arr.map(() => 0));
    let startX = 0;
    let startY = 0;

    for (const char of name.toUpperCase()) {
      const pattern = characterPatterns[char];
      if (!pattern) continue;

      for (let i = 0; i < pattern.length; i++) {
        const row = pattern[i];
        if (!row) continue;
        for (let j = 0; j < row.length; j++) {
          if (startX + i < size && startY + j < size) {
            const value = row[j];
            if (typeof value !== "undefined") {
              newBoard[startX + i]![startY + j] = value;
            }
          }
        }
      }
      startY += 6;
      if (startY + 5 >= size) {
        startY = 0;
        startX += 6;
      }
    }

    setBoard(newBoard);
  };

  return (
    <div>
      <div className="grid-cols-30 grid bg-white shadow-md">
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`h-4 w-4 ${cell ? "bg-black" : "bg-white"} border border-gray-300`}
              onClick={() => handleCellClick(x, y)}
            />
          )),
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={generateRandomState}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Random State
        </button>

        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-gray-300 bg-gray-200 px-4 py-2"
        />
        <button
          onClick={() => writeName(name)}
          className="rounded bg-yellow-500 px-4 py-2 text-white"
        >
          Write Name
        </button>
      </div>
      <button
        className="absolute right-20 top-10 underline hover:text-gray-500 hover:no-underline"
        onClick={() => setShowHelp(!showHelp)}
      >
        Help
      </button>

      {showHelp && (
        <div className="absolute right-20 top-20 w-80 rounded-lg bg-white p-8 text-left">
          <h2 className="mb-4 text-xl font-bold">Help</h2>
          <p className="mb-2 text-sm">
            You can click the grid to toggle cells manually.
          </p>
          <p className="mb-2 text-sm">
            A living cell will stay alive if 2 or 3 neighbours are living.
          </p>
          <p className="mb-2 text-sm">
            You can click <span className="font-bold"> Random State</span> to
            generate random start state.
          </p>
          <p className="mb-2 text-sm">
            Cells with less than 2 neighbours will die of
            <span className="font-bold"> underpopulation</span> , cells with 4
            or more neighbours will die of
            <span className="font-bold"> overpopulation</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
