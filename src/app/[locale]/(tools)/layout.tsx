import EditorLayout from "./EditorLayout";
import "../../globals.css";

export const metadata = {
  title: "My PWA App",
  description: "Next.js 14 PWA using App Router",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f172a", // ✅ Taruh di sini!
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EditorLayout>{children}</EditorLayout>
      </body>
    </html>
  );
}
