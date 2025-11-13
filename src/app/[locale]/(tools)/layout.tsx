// src/app/[locale]/(tools)/layout.tsx
// ✅ OPSI 1: HAPUS FILE INI (paling aman)

// ✅ OPSI 2: Jika harus ada, jangan bungkus dengan AppLayoutClient!
export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // hanya fragment, TANPA layout UI
}
