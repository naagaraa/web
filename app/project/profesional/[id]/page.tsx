"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { ProfessionalProjects } from "@/data/ProfesionalProject";
import HeroImage from "@/assets/hero.png";
import { FaHeart, FaEye } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

type Props = {
  params: {
    id: string;
  };
};

export default function ProjectDetailPage({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = ProfessionalProjects.find(
        (item) => item.id.toString() === params.id
      );
      if (!found) return notFound();
      setProject(found);
      setLoading(false);
    }, 1000); // simulate load
    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading || !project) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton height={20} width={120} />
        <Skeleton height={32} width={280} />
        <Skeleton height={200} />
        <Skeleton count={3} />
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Skeleton circle width={40} height={40} />
          <Skeleton height={40} width={120} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back */}
      <Link href="/#projects" className="text-blue-600 hover:underline text-sm">
        ← Back to Projects
      </Link>

      {/* Title + Stats */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="flex gap-4 text-gray-600 mt-2 md:mt-0 text-sm">
          <span className="flex items-center gap-1">
            <FaHeart /> 0
          </span>
          <span className="flex items-center gap-1">
            <FaEye /> 0
          </span>
        </div>
      </div>

      {/* Image */}
      <motion.div
        className="w-full h-64 relative rounded-xl overflow-hidden shadow"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Description */}
      <p className="text-gray-700 text-base">{project.description}</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <Image
          src={HeroImage}
          alt="Eka Jaya Nagara"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">Eka Jaya Nagara</p>
          <p className="text-sm text-gray-500">Fullstack Developer</p>
        </div>
      </div>

      <p className="text-gray-700 text-base">{project.content}</p>
    </motion.div>
  );
}
