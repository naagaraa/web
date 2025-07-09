import EditorLayout from "./editor/EditorLayout";
import "../../globals.css";

export const metadata = {
  title: "Free Tools",
  description: "Free Tools for Developers",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f172a",
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
