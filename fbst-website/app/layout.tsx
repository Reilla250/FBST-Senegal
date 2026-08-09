import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminBar from "@/components/AdminBar";

export const metadata: Metadata = {
  title: {
    default: "FBST-Senegal | Community Health, Mental Wellbeing and Inclusion",
    template: "%s | FBST-Senegal",
  },
  description:
    "Fondation La Bonne Santé Pour Tous (FBST-Senegal) is a community-rooted, youth-led organisation in Dakar. Health, wellbeing and learning without stigma or fear.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{const key='theme';const stored=localStorage.getItem(key);const prefers=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const theme = stored || (prefers ? 'dark' : 'light'); document.documentElement.classList.add(theme==='dark' ? 'theme-dark' : 'theme-light');}catch(e){} })()` }} />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <AdminBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
