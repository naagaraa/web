"use client";

import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import Heading from "@/src/components/ui/Heading";
import Title from "@/src/components/common/Title";
import SubTitle from "@/src/components/common/SubTitle";
import WrapperContentSlide from "@/src/components/ui/WrapperContentSlide";
import ProjectCard from "@/src/components/ui/card/ProjectCard";
import HeroImage from "@/assets/hero.png";
import { EducationProjectItems } from "@/data/EducationProject";

function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {EducationProjectItems.map((item) => (
        <ProjectCard
          key={item.id}
          id={item.id.toString()}
          title={item.title}
          description={item.description}
          // content={item.content}
          image={item.image}
          authorName="Eka Jaya Nagara"
          authorImage={HeroImage}
          projectdir="project/academic"
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
      <SubTitle value="This portfolio project was built during my academic journey. Check out more below!" />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                height={250}
                className="rounded-xl"
                baseColor="#f3f3f3"
                highlightColor="#ecebeb"
              />
            ))}
          </div>
        }
      >
        <ProjectGrid />
      </Suspense>
    </WrapperContentSlide>
  );
}

export default function ProjectAcademic() {
  return (
    <>
      <Heading name="Project Showcase" title="All My Academic Projects" />
      <Project />
    </>
  );
}
