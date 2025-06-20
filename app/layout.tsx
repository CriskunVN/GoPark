import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { ThemeProvider } from "@/components/provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoPark - Smart Parking Reservation System",
  description:
    "GoPark helps you easily find and reserve parking spots across major cities like Ho Chi Minh City, Hanoi, and Da Nang. Select vehicle type, location, date and time—all in one place.",
  keywords: [
    "GoPark",
    "parking",
    "smart parking",
    "book parking",
    "car park",
    "motorbike parking",
    "parking app",
  ],
  openGraph: {
    title: "GoPark - Reserve Your Parking Spot Easily",
    description:
      "Search and book parking spots by vehicle type and location. Available in Ho Chi Minh City, Hanoi, and Da Nang.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
