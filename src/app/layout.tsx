import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Conway's Game of Life",
  description: "Created with ❤️ by https://x.com/adarsh_mamgain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  authors: [{ name: "Adarsh Mamgain", url: "https://x.com/adarsh_mamgain" }],
  openGraph: {
    siteName: "Conway's Game of Life",
    title: "Conway's Game of Life",
    description: "Created with ❤️ by https://x.com/adarsh_mamgain",
    images: [{ url: "/assets/og-image.webp" }],
    url: process.env.VERCEL_URL,
  },
  twitter: {
    site: process.env.VERCEL_URL,
    creatorId: "@adarsh_mamgain",
    description: "Created with ❤️ by https://x.com/adarsh_mamgain",
    images: "/assets/og-image.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
