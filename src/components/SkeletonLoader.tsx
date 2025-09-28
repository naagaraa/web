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
      {/* Shimmer effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"
      />
    </div>
  );
};

export default SkeletonLoader;
