"use client";

import { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import { PaidProjectItems } from "@/data/PaidProject";
import { paidProjectModel } from "@/types/model/paid.project";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PaidProjectDetailPage(props: Props) {
  const params = use(props.params);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<paidProjectModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const itemId = parseInt(params.id);
      const found = PaidProjectItems.find((item) => item.id === itemId);
      if (!found) return notFound();
      setProject(found);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading || !project) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
        <div className="w-full h-72 md:h-96 bg-gray-300 rounded-xl mx-auto animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Paid Projects
      </button>

      <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
      <p className="text-sm text-gray-500">Year: {project.date}</p>

      {project.cover && (
        <div className="w-full h-64 relative rounded-xl overflow-hidden shadow">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      <p className="text-base text-gray-700 leading-relaxed">
        {project.content}
      </p>

      {project.link && (
        <Link
          href={project.link}
          className="inline-block mt-4 text-white bg-red-600 hover:bg-red-700 font-medium py-2 px-4 rounded-lg text-sm"
          target="_blank"
        >
          Check Live Project
        </Link>
      )}

      <div className="pt-4">
        <span className="font-semibold">Tech Stack:</span>{" "}
        <span className="text-gray-700">{project.stack}</span>
      </div>
    </motion.div>
  );
}
