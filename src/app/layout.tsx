import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hanken.className}>
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
