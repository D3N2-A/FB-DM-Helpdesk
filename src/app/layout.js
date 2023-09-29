"use client";
import { RecoilRoot } from "recoil";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { loadFacebookSDK } from "../../Utils/FIrebaseSDK";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    loadFacebookSDK();
    localStorage.setItem(
      "user",
      JSON.stringify({ status: "", accessToken: "" })
    );
  }, []);
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
