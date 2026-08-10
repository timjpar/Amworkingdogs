import type { Metadata } from "next";
import { Bitter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme/ThemeProvider";
import { ThemeSwitcher } from "@/app/_components/theme/ThemeSwitcher";
import { Navigation } from "@/app/_components/nav/Navigation";
import { AnnouncementBanner } from "@/app/_components/AnnouncementBanner";
import { Footer } from "@/app/_components/Footer";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { localBusinessSchema } from "@/app/_lib/schema";
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from "@/app/_config/business";

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const shareImage = "/images/dogs/kangal-pyrenees-guardian-dogs-pair-pasture.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AM Working Dogs — Kangal x Great Pyrenees Livestock Guardian Dogs",
    template: "%s | AM Working Dogs",
  },
  description:
    "Kangal x Great Pyrenees livestock guardian dog puppies raised on a working homestead in Newport, TN. Whelped among poultry and stock. Serving East Tennessee and Western North Carolina.",
  keywords: [
    "livestock guardian dog",
    "Kangal puppies",
    "Great Pyrenees",
    "LGD puppies for sale",
    "guardian dog breeder Tennessee",
    "Newport TN",
    "predator control",
  ],
  openGraph: {
    siteName: "AM Working Dogs",
    type: "website",
    images: [
      {
        url: shareImage,
        alt: "Kangal x Great Pyrenees livestock guardian dogs on pasture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage],
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const fontVars = [bitter.variable, sourceSans.variable].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="ridgeline" className={fontVars}>
      {/* Flash-prevention: reads localStorage before React hydrates.
          Validates against the current theme list so stale values from
          a previous theme set fall back to the default cleanly. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var allowed=['ridgeline','pasture','clay','nightwatch'];var t=localStorage.getItem('awd-theme');if(!t||allowed.indexOf(t)===-1){t='ridgeline';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <JsonLd data={localBusinessSchema()} />
        <ThemeProvider>
          <AnnouncementBanner />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
