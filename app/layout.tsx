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
        <h1 className="text-gray-400 absolute bottom-1 left-1 text-sm">©Aleksander Iwanowski powered by <a href="https://vercel.com">Vercel</a></h1>
      </body>
    </html>
  );
}
