// components/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { easeOut, easeInOut } from "framer-motion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Fungsi untuk menentukan kategori berdasarkan pathname
  const getAnimationConfig = (path: string) => {
    // Kalkulator & Health-related
    if (
      path.includes("calculator/") ||
      path.includes("bmi") ||
      path.includes("bmr") ||
      path.includes("water") ||
      path.includes("sleep-time") ||
      path.includes("vitamins") ||
      path.includes("calorie") ||
      path.includes("macronutrient") ||
      path.includes("pregnancy")
    ) {
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.3, ease: easeOut },
      };
    }

    // Mental Health
    if (path.includes("mental-health/")) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.4, ease: easeOut },
      };
    }

    // Developer Tools
    if (
      path.includes("text/") &&
      (path.includes("jwt") || path.includes("base64") || path.includes("json"))
    ) {
      return {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.25, ease: easeOut },
      };
    }

    // Documents & Text Tools
    if (path.includes("pdf")) {
      return {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.25, ease: easeOut },
      };
    }
    if (path.includes("text") || path.includes("Text")) {
      return {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.25, ease: easeOut },
      };
    }

    // Image Tools
    if (path.includes("image/")) {
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        // FIX: Hapus `type: "spring"` dan biarkan framer-motion infer
        transition: { stiffness: 300, damping: 25 },
      };
    }

    // Network Tools
    if (
      path.includes("ip-subnetting") ||
      path.includes("vlsm") ||
      path.includes("conversion-tools")
    ) {
      return {
        initial: { opacity: 0, rotateY: 15 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: -15 },
        transition: { duration: 0.3, ease: easeOut },
      };
    }

    // Default animasi (fallback)
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.25, ease: easeInOut },
    };
  }; // <<== Jangan lupa kurung kurawal tutup

  const animationConfig = getAnimationConfig(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        exit={animationConfig.exit}
        transition={animationConfig.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
