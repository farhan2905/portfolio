import type { Metadata } from "next";
import { Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-kalam",
});

const caveat = Caveat({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-caveat",
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
        className={`${kalam.variable} ${caveat.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="fixed inset-0 sketch-bg-pattern pointer-events-none z-0"></div>
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
