import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farhan Siddiqui - Data Science & AI/ML Faculty",
  description: "Explore my AI/ML projects, teaching experience, and cutting-edge research in data science and artificial intelligence.",
  keywords: ["Farhan Siddiqui", "Data Science", "AI", "Machine Learning", "Next.js", "TypeScript", "React"],
  authors: [{ name: "Farhan Siddiqui" }],
  openGraph: {
    title: "Farhan Siddiqui - Data Science & AI/ML Faculty",
    description: "Data Science & AI/ML expert | Teaching & Innovation",
    url: "https://farhansiddiqui.space",
    siteName: "Farhan Siddiqui",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Siddiqui - Data Science & AI/ML Faculty",
    description: "Data Science & AI/ML expert | Teaching & Innovation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
