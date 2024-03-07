"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const kanit = Kanit({ subsets: ["latin"], weight: ["300"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
