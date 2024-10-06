import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import style from "./page.module.scss";

const inter = Oswald({
  subsets: ["latin"],
  weight: "400",
   display: "swap",
});
export const metadata: Metadata = {
  title: "TuneWave",
  description:
    "TuneWave is an innovative web application that gives users the ability to explore and enjoy music using the data and functionality of the Spotify API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${style.Body}`}>{children}</body>
    </html>
  );
}
