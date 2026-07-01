import type { Metadata } from "next";
import { Fraunces, Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-fraunces",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-baloo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SHANAKHT — Extract Your Card, Instantly",
  description:
    "Upload the front and back of your CNIC and get clean, structured details back in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${baloo.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
