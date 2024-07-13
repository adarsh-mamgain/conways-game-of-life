import GameBoard from "@/_components/GameBoard";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Conway's Game of Life",
};

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center py-2">
      <div className="absolute h-full w-full bg-[url('/assets/image.png')] opacity-10"></div>
      <main className="z-1 z-10 flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="mb-8">
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-6xl font-black text-transparent">
            Conway&apos;s
          </span>
          <br />
          <span className="text-4xl font-bold">Game of Life</span>
        </h1>
        <GameBoard />
      </main>
    </div>
  );
}
