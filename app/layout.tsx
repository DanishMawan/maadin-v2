import type { Metadata } from "next";
import "./globals.css";
import { satoshi, inter, plexMono } from "./fonts";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ClientEffects from "@/components/client-effects";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Maadin.AI, Natural resource intelligence",
  },
  description:
    "Maadin.AI is a venture builder and an executive practice, deploying AI to natural-resource intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${satoshi.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
