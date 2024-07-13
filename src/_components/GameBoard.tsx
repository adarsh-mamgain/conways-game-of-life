"use client";
import React, { useState, useEffect } from "react";
import { characterPatterns } from "@/utils/characterPatterns";

const GameBoard = () => {
  const size = 30;
  const [board, setBoard] = useState<number[][]>(
    Array(size).fill(Array(size).fill(0)),
  );
  const [running, setRunning] = useState(false);
  const [name, setName] = useState("");

  // Function to calculate next state
  const getNextState = (board: number[][]): number[][] => {
    const newBoard = board.map((arr) => [...arr]);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const neighbours = countNeighbours(board, i, j);
        if (board[i][j] === 0 && neighbours === 3) {
          newBoard[i][j] = 1;
        } else if (board[i][j] === 1 && (neighbours < 2 || neighbours > 3)) {
          newBoard[i][j] = 0;
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
        if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
          count += board[newX][newY];
        }
      }
    }
    return count;
  };

  // Handle click to toggle cell state
  const handleCellClick = (x: number, y: number) => {
    const newBoard = board.map((arr) => [...arr]);
    newBoard[x][y] = board[x][y] ? 0 : 1;
    setBoard(newBoard);
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
        for (let j = 0; j < pattern[i].length; j++) {
          if (startX + i < size && startY + j < size) {
            newBoard[startX + i][startY + j] = pattern[i][j];
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
      <div className="grid-cols-30 grid">
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
      <div className="mt-4 space-x-2">
        <div>
          <button
            onClick={() => setRunning(!running)}
            className="bg-blue-500 p-2 text-white"
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            onClick={generateRandomState}
            className="bg-green-500 p-2 text-white"
          >
            Random State
          </button>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2"
          />
          <button
            onClick={() => writeName(name)}
            className="bg-yellow-500 p-2 text-white"
          >
            Write Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
