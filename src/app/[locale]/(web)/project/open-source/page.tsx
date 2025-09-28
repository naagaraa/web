"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Heading from "@/src/components/ui/Heading";
import WrapperContentSlide from "@/src/components/ui/WrapperContentSlide";
import Title from "@/src/components/common/Title";
import SubTitle from "@/src/components/common/SubTitle";
import { OpenSourceProject } from "@/data/OpenSourceProject";
import ProjectCard from "@/src/components/ui/card/ProjectCard";
import HeroImage from "@/assets/hero.png";
import NavTabs from "@/src/components/layout/NavTabs";

function ProjectGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {OpenSourceProject.map((item) => (
          <ProjectCard
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            description={item.description}
            image={item.image}
            authorName="Eka Jaya Nagara"
            authorImage={HeroImage}
            projectdir="project/open-source"
            likes={0}
            views={0}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Project() {
  return (
    <>
      <NavTabs />
      <WrapperContentSlide>
        <Title value="Project" />
        <SubTitle value="This Portfolio Project I built in Open Source / Personal Projects. Slide to check more." />

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 bg-gray-300 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          }
        >
          <ProjectGrid />
        </Suspense>
      </WrapperContentSlide>
    </>
  );
}

export default function ProjectOpenSource() {
  return (
    <>
      <Heading
        name="Open Source Project"
        title="All My Projects in Open Source or Personal Works"
      />
      <Project />
    </>
  );
}
