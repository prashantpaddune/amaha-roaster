import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Header from "@/components/roster-navbar";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amaha - Roster Management",
  description: "Roster Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${inter.variable} flex flex-col h-screen overflow-hidden`}>
            <Providers>
                <Header/>
                <div className="flex flex-1 overflow-hidden">
                    {children}
                </div>
            </Providers>
        </body>
      </html>
  );
}
