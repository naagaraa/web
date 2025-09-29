"use client";

import { motion } from "framer-motion";
import React from "react";

interface SkeletonProps {
  className?: string;
}

const SkeletonLoader = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}
    >
      {/* Shimmer gradient */}
      <motion.div
        initial={{ x: "-50%" }}
        animate={{ x: "150%" }}
        transition={{
          repeat: Infinity,
          duration: 6, // lebih panjang (6 detik)
          ease: "linear",
        }}
        className="
          absolute inset-0
          bg-gradient-to-r 
          from-transparent 
          via-gray-200/40 
          to-transparent
          w-1/2
        "
      />
    </div>
  );
};

export default SkeletonLoader;
