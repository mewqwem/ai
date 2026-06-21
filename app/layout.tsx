import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: якщо назва бренду інша — поміняй тільки тут, решта підхопиться сама
const SITE_NAME = "AImedia";
const SITE_URL = "https://aimedia.pp.ua";
const SITE_DESCRIPTION =
  "Кінематографічна AI-реклама та предметна фотографія для вашого бізнесу. Готовий контент за 24-72 години, у 10 разів дешевше за традиційну зйомку.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-фото та відео для бізнесу за 24-72 години`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI фото товарів",
    "генерація фото нейромережею",
    "AI відео реклама",
    "предметна фотографія штучний інтелект",
    "фото для маркетплейсів",
    "3D обертання товару",
  ],
  openGraph: {
    title: `${SITE_NAME} — AI-фото та відео для бізнесу`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    // TODO: додай реальний файл 1200x630px у public/og-image.jpg
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI-фото та відео для бізнесу`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
