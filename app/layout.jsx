import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Miyuki Nagara | Web",
  description: "Website by Miyuki Nagara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
