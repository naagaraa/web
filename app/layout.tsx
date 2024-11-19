import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import { ChildrenProps } from "@/types/components/types";
import 'react-loading-skeleton/dist/skeleton.css'
// import { Provider } from "react-redux";
// import store from "@/stores";

export const metadata: Metadata = {
  title: "Eka Jaya Nagara - Software Engginner",
  description: "Freelance and Software Enggineer base in bekasi",
};

export default function RootLayout({
  children,
}: Readonly<ChildrenProps>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>
        {/* <Provider store={store}> */}
        <Header />
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
          <main className="justify-center min-h-screen gap-10 ">{children}</main>
        </SkeletonTheme>
        <Footer />
        {/* </Provider> */}
      </body>
    </html>
  );
}
