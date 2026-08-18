import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminBar from "@/components/AdminBar";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fdnlabonnesantepourtous.org"),
  title: {
    default: "FBST-Senegal | Community Health, Mental Wellbeing and Inclusion",
    template: "%s | FBST-Senegal",
  },
  description:
    "Fondation La Bonne Santé Pour Tous (FBST-Senegal) is a community-rooted, youth-led organisation in Dakar. Health, wellbeing and learning without stigma or fear.",
  keywords: ["FBST", "Senegal", "Dakar", "santé", "wellbeing", "jeunesse", "mental health", "HIV prevention", "community health"],
  authors: [{ name: "FBST-Senegal" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    alternateLocale: ["en_US"],
    siteName: "FBST-Senegal",
    title: "FBST-Senegal | Community Health, Mental Wellbeing and Inclusion",
    description:
      "Fondation La Bonne Santé Pour Tous – youth-led community health organisation in Dakar, Senegal.",
    url: "https://www.fdnlabonnesantepourtous.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "FBST-Senegal | Community Health & Inclusion",
    description: "Youth-led community wellbeing in Dakar — health, education and protection without stigma.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{const key='theme';const stored=localStorage.getItem(key);const prefers=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const theme = stored || (prefers ? 'dark' : 'light'); document.documentElement.classList.add(theme==='dark' ? 'theme-dark' : 'theme-light');}catch(e){} })()` }} />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <LanguageProvider>
          <AdminBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

