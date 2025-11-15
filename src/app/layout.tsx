import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Hanken_Grotesk } from "next/font/google";
import Script from "next/script";

const hanken = Hanken_Grotesk({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

  return (
    <html lang="en" className={hanken.className}>
      {analyticsEnabled && (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-50EDMDZV2X"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-50EDMDZV2X');
            `}
          </Script>
        </>
      )}
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
