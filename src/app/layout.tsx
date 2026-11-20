import "./globals.css";
import { Metadata } from "next";
import { Cabin, Fira_Mono, Noto_Sans_Thai } from "next/font/google";
import Providers from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import NextTopLoader from "nextjs-toploader";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { getLocale, getMessages } from "@/lib/i18n/server";

/* Cabin stands in for Gill Sans; Fira Mono sets labels, nav and prices. */
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cabin",
});

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-mono",
});

/* Thai glyphs fall through to this in both stacks. */
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
    // The font variables must sit on <html>: Tailwind's --font-sans/--font-mono
    // are declared on :root and resolve var(--font-cabin) there.
    <html
      lang={locale}
      className={`${cabin.variable} ${firaMono.variable} ${sansThai.variable}`}
    >
      <body>
        <LocaleProvider locale={locale}>
          <a
            href="#main-content"
            className="label-mono fixed left-4 top-3 z-[100] -translate-y-20 bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
          >
            {t.layout.skip}
          </a>
          <NextTopLoader color="#b56b45" height={2} showSpinner={false} />
          <Navbar />
          <Providers>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </Providers>
          <Footer />
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  );
}
