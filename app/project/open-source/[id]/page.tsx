"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { OpenSourceProject } from "@/data/OpenSourceProject";
import Image from "next/image";
import HeroImage from "@/assets/hero.png";
import { FaHeart, FaEye } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function ProjectOpenSourceDetailPage({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = OpenSourceProject.find(
        (item) => item.id.toString() === params.id
      );
      if (!found) return notFound();
      setProject(found);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading || !project) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton width={200} height={24} />
        <Skeleton width="100%" height={240} />
        <Skeleton count={3} />
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <Skeleton circle height={40} width={40} />
          <Skeleton height={40} width={120} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/#open-source"
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to Open Source Projects
      </Link>

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

      <div className="w-full h-64 relative rounded-xl overflow-hidden shadow">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-gray-700 text-base">{project.description}</p>

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
          <p className="text-sm text-gray-500">Open Source Developer</p>
        </div>
      </div>

      <p className="text-gray-700 text-base">{project.content}</p>
    </motion.div>
  );
}
