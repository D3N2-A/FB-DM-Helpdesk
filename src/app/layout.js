"use client";
import { RecoilRoot } from "recoil";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <div className="fb-root">{children}</div>
        </RecoilRoot>
      </body>
      <title>Facebook Helpdesk</title>
    </html>
  );
}
