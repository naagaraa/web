// src/app/[locale]/(tools)/apps/layout.tsx

import PageTransition from "../PageTransition";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("📱 AppsLayout rendered"); // Untuk debugging
  return <PageTransition>{children}</PageTransition>;
}
