import "./globals.css";
import { Metadata } from "next";
import { Fraunces, Inter, Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import Providers from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { getLocale, getMessages } from "@/lib/i18n/server";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* Thai glyphs fall through to these: a serif for headings, a sans for text. */
const serifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  variable: "--font-serif-thai",
});

const sansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-thai",
});

export async function generateMetadata(): Promise<Metadata> {
  const m = (await getMessages()).meta;
  return {
    title: {
      default: m.siteTitle,
      template: "%s | TourFlow",
    },
    description: m.siteDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: m.siteTitle,
      description: m.siteDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${fraunces.variable} ${inter.variable} ${serifThai.variable} ${sansThai.variable}`}
      >
        <LocaleProvider locale={locale}>
          <a
            href="#main-content"
            className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
          >
            {t.layout.skip}
          </a>
          <NextTopLoader color="#b56b45" height={3} showSpinner={false} />
          <Navbar />
          <Providers>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </Providers>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
