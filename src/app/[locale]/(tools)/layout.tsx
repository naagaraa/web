import EditorLayout from "./EditorLayout";
import "../../globals.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EditorLayout>{children}</EditorLayout>
      </body>
    </html>
  );
}
