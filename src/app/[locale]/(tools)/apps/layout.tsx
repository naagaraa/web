// src/app/[locale]/(tools)/apps/layout.tsx

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-[100px]">
      {" "}
      {/* sesuaikan 70px dengan height bottom nav */}
      {children}
    </div>
  );
}
