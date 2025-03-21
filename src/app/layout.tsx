import type { Metadata } from "next";
import "./globals.css";
import Nav from "./(components)/Nav";

export const metadata: Metadata = {
  title: "Journal App",
  description: "Jot down your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gay-100">
        <Nav/>
        <div className="m-2">
        {children}
        </div>
        </body>
    </html>
  );
}
