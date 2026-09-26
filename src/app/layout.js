import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PlanProvider } from "../components/PlanContext";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-body text-white antialiased">
        <PlanProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
