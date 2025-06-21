import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "RedirecTo - Modern URL Protection & Analytics Platform",
  description:
    "Create links instantly. Monitor traffic effortlessly. RedirecTo. is your modern platform for intelligent link shortening. Get custom URLs, detailed click analytics, blazing-fast redirects, and powerful link management tools — all in one place.",
  keywords: [
    "link shortener",
    "URL shortener",
    "analytics",
    "custom URLs",
    "click tracking",
    "RedirecTo",
    "link management",
    "short links",
    "PWA",
    "SEO",
    "open graph",
    "twitter cards",
  ],
  authors: [
    { name: "RedirecTo Team", url: "https://redirec-to.vercel.app/about" },
  ],
  publisher: "RedirecTo",
  creator: "RedirecTo",
  robots: "index, follow",
  openGraph: {
    title: "RedirecTo. | Modern Link Shortening & Analytics Platform",
    description:
      "Create links instantly. Monitor traffic effortlessly. RedirecTo. is your modern platform for intelligent link shortening.",
    url: "https://redirec-to.vercel.app/",
    siteName: "RedirecTo",
    images: [
      {
        url: "https://redirec-to.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "RedirecTo - Modern Link Shortening Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@redirecto",
    creator: "@redirecto",
    title: "RedirecTo. | Modern Link Shortening & Analytics Platform",
    description:
      "Create links instantly. Monitor traffic effortlessly. RedirecTo. is your modern platform for intelligent link shortening.",
    images: ["https://redirec-to.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: "https://redirec-to.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/images/background.jpeg" />
        <link rel="preload" as="audio" href="/audio/notification.mp3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "RedirecTo",
              url: "https://redirec-to.vercel.app/",
              description:
                "Create links instantly, monitor traffic effortlessly, and manage your URLs with RedirecTo.",
              publisher: {
                "@type": "Organization",
                name: "RedirecTo",
                url: "https://redirec-to.vercel.app/",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://redirec-to.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            {/* Your other providers */}
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
