import Footer from "@/src/components/layout/Footer";
import type { Metadata } from "next";
import Content from "./components/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Syarat dan ketentuan penggunaan layanan.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="justify-center items-center flex min-h-screen">
        <Content />
      </div>
      <Footer />
    </>
  );
}
