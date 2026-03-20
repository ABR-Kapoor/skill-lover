import { Outfit, Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import { CursorAura } from "@/components/ui/cursor-aura";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-data",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Skill Lover - Your AI-Powered Career Architect",
    template: "%s | Skill Lover"
  },
  description: "Generate personalized career roadmaps and optimize your resume with AI. From student to professional, we've got your career journey covered.",
  keywords: ["career planning", "AI roadmap", "resume analyzer", "ATS", "career development", "job search", "freelancing"],
  authors: [{ name: "Skill Lover Team" }],
  creator: "Skill Lover",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skilllover.com",
    title: "Skill Lover - Your AI-Powered Career Architect",
    description: "Generate personalized career roadmaps and optimize your resume with AI.",
    siteName: "Skill Lover",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Lover - Your AI-Powered Career Architect",
    description: "Generate personalized career roadmaps and optimize your resume with AI.",
    creator: "@skilllover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={`${outfit.variable} ${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased app-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CursorAura />
            <div className="bg-orb-1" />
            <div className="bg-orb-2" />
            <div className="bg-orb-3" />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
