// app/layout.tsx
"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import ThemeProvider from "@/components/ThemeProvider"; 
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Fitness Tracker",
//   description: "Track your fitness goals and progress",
// };



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
          {pathname !== "/login" && pathname !== "/" && !pathname.startsWith("/signup") && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
