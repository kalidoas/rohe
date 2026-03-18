import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "ROHE Parfumerie - L'art du parfum",
  description: "Parfumerie de Luxe · Maroc. Inspirations des plus grandes maisons · Qualité originale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen bg-cream text-charcoal font-sans selection:bg-gold/20">
        {children}

        <a
          href="https://wa.me/212604283228"
          target="_blank"
          rel="noreferrer"
          aria-label="Contacter ROHE sur WhatsApp"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.59c-.27-.14-1.58-.78-1.82-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.35-1.6-1.51-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.32z"/>
            <path d="M16 3C8.82 3 3 8.82 3 16c0 2.31.61 4.56 1.77 6.55L3 29l6.63-1.72A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.5c-2.03 0-4.02-.55-5.75-1.6l-.41-.24-3.93 1.02 1.05-3.83-.27-.39A10.44 10.44 0 0 1 5.5 16C5.5 10.77 10.77 5.5 16 5.5S26.5 10.77 26.5 16 21.23 26.5 16 26.5z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
