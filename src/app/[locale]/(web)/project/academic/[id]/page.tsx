"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import { EducationProjectItems } from "@/data/EducationProject";
import Image from "next/image";
import HeroImage from "@/assets/hero.png";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import NavTabs from "@/src/components/layout/NavTabs";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectDetailPage(props: Props) {
  const params = use(props.params);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = EducationProjectItems.find(
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
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Skeleton width={300} height={36} />
        <Skeleton width="100%" height={320} />
        <Skeleton count={4} />
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="max-w-3xl mx-auto p-6 md:pt-12 md:pb-20 space-y-10 leading-relaxed text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/project/academic"
          className="block mt-16 text-blue-600 hover:underline text-sm"
        >
          ← Back to Projects
        </Link>

        {/* Judul */}
        <h1 className="text-4xl font-bold text-center">{project.title}</h1>

        {/* Subjudul (jika ada) */}
        {project.subtitle && (
          <p className="text-lg text-center text-gray-500">
            {project.subtitle}
          </p>
        )}

        {/* Gambar utama */}
        <div className="w-full h-72 md:h-96 relative rounded-xl overflow-hidden shadow">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Profil Penulis */}
        <div className="flex items-center gap-3 pt-8 border-y border-gray-200">
          <Image
            src={HeroImage}
            alt="Eka Jaya Nagara"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">Eka Jaya Nagara</p>
            <p className="text-sm text-gray-500">Fullstack Developer</p>
          </div>
        </div>

        {/* Konten utama */}
        <div className="prose prose-lg max-w-none prose-headings:mt-8 prose-img:rounded-xl prose-p:leading-7">
          <p>{project.description}</p>
          <div
            className="pt-4"
            dangerouslySetInnerHTML={{ __html: project.content }}
          ></div>
        </div>
      </motion.div>
    </>
  );
}
