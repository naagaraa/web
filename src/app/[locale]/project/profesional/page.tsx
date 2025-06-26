"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

import Heading from "@/components/ui/Heading";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import WrapperContentSlide from "@/components/ui/WrapperContentSlide";
import ProjectCard from "@/components/ui/card/ProjectCard";

import HeroImage from "@/assets/hero.png";
import { ProfessionalProjects } from "@/data/ProfesionalProject";

function ProjectGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {ProfessionalProjects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id.toString()}
          title={project.title}
          description={project.description}
          image={project.image}
          authorName="Eka Jaya Nagara"
          authorImage={HeroImage}
          projectdir="project/profesional"
          likes={0}
          views={0}
        />
      ))}
    </div>
  );
}

function Project() {
  return (
    <WrapperContentSlide>
      <Title value="Project" />
      <SubTitle value="Projects from my professional work experience — from CMS rewrites to internal systems." />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={250} className="rounded-xl" />
            ))}
          </div>
        }
      >
        <ProjectGrid />
      </Suspense>
    </WrapperContentSlide>
  );
}

export default function ProjectProfesional() {
  return (
    <>
      <Heading
        name="Professional Project"
        title="All My Work from Professional / Hybrid Experience"
      />
      <Project />
    </>
  );
}
