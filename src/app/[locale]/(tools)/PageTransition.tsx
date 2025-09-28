"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState, useEffect } from "react";
import { easeOut, easeInOut } from "framer-motion";
import React from "react";
import SkeletonLoader from "@/src/components/SkeletonLoader";

function PageTransitionComponent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Fake loading effect (simulate skeleton during route transition)
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // adjust duration
    return () => clearTimeout(timeout);
  }, [pathname]);

  const animationConfig = useMemo(() => {
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.25, ease: easeInOut },
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        exit={animationConfig.exit}
        transition={animationConfig.transition}
        className="h-full w-full"
      >
        {loading ? (
          <div className="space-y-3 p-4">
            <SkeletonLoader className="h-6 w-1/3" />
            <SkeletonLoader className="h-4 w-2/3" />
            <SkeletonLoader className="h-4 w-1/2" />
            <SkeletonLoader className="h-64 w-full" />
          </div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const PageTransition = React.memo(PageTransitionComponent);
export default PageTransition;
