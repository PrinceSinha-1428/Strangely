import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Omegle | Strangely",
  description: "Anonymous Video chat to random stranger",
};

export default function RootLayout({ children} : Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {children}
      </body>
    </html>
  );
}
