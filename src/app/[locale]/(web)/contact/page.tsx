"use client";
import Footer from "@/src/components/layout/Footer";
import Heading from "@/src/components/ui/Heading";
import ContactContent from "./components/ContactContent";
import Script from "next/script";

export default function ContactPage() {
  return (
    <>
      <Script
        id="recaptcha"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <Heading
        backgroundImage="https://images.unsplash.com/photo-1555043722-4523972f07ee?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        name="Kontak"
        title="Software Developer & IT Support"
      />
      <ContactContent />
      <Footer />
    </>
  );
}
