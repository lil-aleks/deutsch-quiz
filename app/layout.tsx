import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Deutsch Quiz",
  description: "Deutsch Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className="bg-primary w-dvw h-dvh"
      >
        {children}
      </body>
    </html>
  );
}
