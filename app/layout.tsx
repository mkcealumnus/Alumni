import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DevicePreviewBar } from "@/components/layout/device-preview-bar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alumnux — Student Career Guidance & Alumni Networking Platform",
  description:
    "Your Network. Your Next Chapter. Independently operated alumni platform connecting college students with verified alumni for mentorship, mock interviews, and career referrals.",
  keywords: [
    "Alumni Network",
    "Student Mentorship",
    "Career Guidance",
    "Engineering Placements",
    "Anna University Alumni",
    "Tech Referrals",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-page text-primary antialiased">
        <DevicePreviewBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
