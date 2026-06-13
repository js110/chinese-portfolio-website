import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "蒋胜 | Developer Portfolio",
  description: "Full-stack developer, AI enthusiast, and open-source contributor. Building the future with code.",
  keywords: ["developer", "hacker", "portfolio", "AI", "machine learning", "open source"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Fira+Code:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white font-mono">
        {/* 矩阵雨背景 */}
        <div className="matrix-bg" />
        
        {/* 扫描线效果 */}
        <div className="scanlines" />
        
        {/* 主内容 */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
