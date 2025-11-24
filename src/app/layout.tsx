import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Library",
  description: "Beautifully designed components",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar min-h-screen flex flex-col bg-background text-foreground`}
      >
        {/* Theme Initialization Script */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var d = document.documentElement;
              var t = localStorage.getItem('theme');
              if (t) d.setAttribute('data-theme', t);
              d.classList.add('theme-ready');
            } catch (e) { document.documentElement.classList.add('theme-ready'); }
          `}
        </Script>

        <ThemeProvider>
          <Navbar />
          <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col relative shadow-2xl overflow-hidden bg-background">
            <main className="flex-1 min-h-0">
              {children}
            </main>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}