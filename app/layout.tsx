import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

export const metadata: Metadata = {
  title: "Eka Jaya Nagara - Software Engginner",
  description: "Freelance and Software Enggineer base in bekasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>
        <Header />
        <main className="justify-center min-h-screen gap-10 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
