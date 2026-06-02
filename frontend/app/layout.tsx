import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔥 IMPORT DEL NAVBAR
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Shop ☕",
  description: "Tienda de cafés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* 🔥 NAVBAR GLOBAL */}
        <Navbar />

        {/* 🔥 CONTENIDO (con espacio para navbar fijo) */}
        <div style={{ paddingTop: "70px", flex: 1 }}>
          {children}
        </div>

      </body>
    </html>
  );
}