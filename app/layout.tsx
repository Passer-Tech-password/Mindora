import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const ogImageUrl =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Mindora%20wellness%20app%20brand%20cover%2C%20purple%20lotus%20logo%2C%20soft%20lavender%20gradient%20background%2C%20premium%20minimalist%20design&image_size=square_hd";

const appleIconUrl =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Mindora%20app%20icon%2C%20purple%20lotus%20flower%20on%20white%20rounded%20square&image_size=square";

export const viewport: Viewport = {
  themeColor: "#5B3FA8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mindora.app"),
  title: "Mindora — Elevate Your Mind Daily",
  description:
    "Mindora helps you understand your feelings, build positive habits, and find peace in everyday moments. Your daily space for mental and emotional wellness.",
  openGraph: {
    title: "Mindora — Elevate Your Mind Daily",
    description:
      "Your daily space to feel better, grow stronger, and live mindfully.",
    type: "website",
    siteName: "Mindora",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Mindora — Elevate Your Mind Daily",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindora — Elevate Your Mind Daily",
    description:
      "Mental wellness made personal. Mood check-ins, affirmations, calming audio, and a positive community.",
    images: [ogImageUrl],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%235B3FA8'/%3E%3Cstop offset='1' stop-color='%236D3FE8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23g)'/%3E%3Cpath d='M32 48c-11 0-18-7.5-18-15.8S21 16 32 16s18 7.5 18 16.2S43 48 32 48z' fill='none' stroke='%23FCFAFF' stroke-width='3'/%3E%3Cpath d='M23 30c3 2 6 3 9 3s6-1 9-3' fill='none' stroke='%23FCFAFF' stroke-width='2.5' stroke-linecap='round'/%3E%3Ccircle cx='27' cy='26' r='2.2' fill='%23D9B86C'/%3E%3Ccircle cx='37' cy='26' r='2.2' fill='%23D9B86C'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
    apple: [appleIconUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col bg-offWhite">
        <AuthProvider>
          <Navbar />
          <main id="main" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
