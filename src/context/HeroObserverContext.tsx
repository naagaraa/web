// src/context/HeroObserverContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type HeroObserverContextType = {
  isOnHero: boolean;
  isDesktop: boolean;
};

const HeroObserverContext = createContext<HeroObserverContextType>({
  isOnHero: false,
  isDesktop: true,
});

export function HeroObserverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnHero, setIsOnHero] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Deteksi mobile/desktop
    const checkIfDesktop = () => {
      const isDesk = window.innerWidth >= 768; // md breakpoint di Tailwind
      setIsDesktop(isDesk);
      return isDesk;
    };

    const isNowDesktop = checkIfDesktop();

    // Hanya observasi hero di desktop
    if (isNowDesktop) {
      const hero = document.getElementById("hero");
      if (!hero) {
        setIsOnHero(false);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsOnHero(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(hero);
      return () => observer.disconnect();
    } else {
      // Di mobile: pastikan header tidak transparan
      setIsOnHero(false);
    }

    // Opsional: update saat resize
    const handleResize = () => {
      const isDesk = checkIfDesktop();
      if (!isDesk) {
        setIsOnHero(false); // matikan transparansi saat ke mobile
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeroObserverContext.Provider value={{ isOnHero, isDesktop }}>
      {children}
    </HeroObserverContext.Provider>
  );
}

export const useHeroObserver = () => useContext(HeroObserverContext);
