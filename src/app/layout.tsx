import "./globals.css";
import { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Providers from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "TourFlow — Small-group tours and activities",
    template: "%s | TourFlow",
  },
  description:
    "Editorial small-group tours and single-day activities in places worth the long way in.",
  openGraph: {
    title: "TourFlow — Small-group tours and activities",
    description:
      "Editorial small-group tours and single-day activities in places worth the long way in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <NextTopLoader color="#b56b45" height={3} showSpinner={false} />
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
