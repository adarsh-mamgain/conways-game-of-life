import GameBoard from "@/_components/GameBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conway's Game of Life",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="mb-8">
          <span className="text-6xl font-black">Conway's </span>
          <br />
          <span className="text-4xl font-bold">Game of Life</span>
        </h1>
        <GameBoard />
      </main>
    </div>
  );
}
