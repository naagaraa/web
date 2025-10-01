"use client";

import ProjectLifecycleSection from "./home/ProjectLifecycleSection";
import ProductivityTools from "./home/ProductifityTools";
import Hero from "./home/HeroSection";
import Services from "./home/ServiceSection";

export default function Home() {
  return (
    <main className="bg-white">
      {/* <Hero /> */}
      <ProductivityTools />
      <Services />
      <ProjectLifecycleSection />
    </main>
  );
}
