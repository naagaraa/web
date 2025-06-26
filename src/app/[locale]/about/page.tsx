"use client";

import React from "react";
import { motion } from "framer-motion";
import Heading from "@/src/components/ui/Heading";
import { CertificationItems } from "@/data/Certification";
import { EducationItems } from "@/data/Education";
import Title from "@/src/components/common/Title";
import SubTitle from "@/src/components/common/SubTitle";
import List from "@/src/components/common/List";
import { ExperienceItems } from "@/data/Experience";
import Describe from "@/src/components/common/Describe";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useLoading from "@/composables/hook/useLoading";
import "plyr-react/plyr.css";
import Image from "next/image";
import WraperContent from "@/src/components/ui/WrapperContent";
import Link from "next/link";
import { sectionHeaderProps } from "@/types/components/types";
import Section from "@/src/components/ui/Section";

function SectionHeader({
  title = "",
  description = "",
  link = "/",
}: sectionHeaderProps) {
  return (
    <>
      <div className="mb-5 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Title value={title} />
          <SubTitle value={description} />
        </div>

        <div className="flex items-center gap-4">
          <Link
            target="_blank"
            href={link}
            className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
            <span className="text-sm font-medium"> View All </span>
          </Link>
          <Link
            target="_blank"
            href={"https://www.youtube.com/@miyukinagara"}
            className="inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
            type="button"
          >
            <span className="text-sm font-medium"> Follow Me </span>
          </Link>
        </div>
      </div>
    </>
  );
}

function Story() {
  return (
    <Section>
      <Title value="About Me" />
      <Describe value="I’m an Information Technology graduate with three years of hands-on experience working across web development and IT support. While I wouldn’t call myself an expert, I’ve built a solid foundation in programming — mainly with PHP (Laravel) — and have explored other languages like JavaScript, TypeScript, Python, Java, and Bash to support various projects and tasks." />

      <Describe value="My experience goes beyond coding. I’ve worked directly with system infrastructure: from server migration, setting up virtual environments using VirtualBox/VMware, to supporting DevOps workflows like scripting automation and deploying applications on Linux-based servers." />
      <Describe value="I might not have a single deep specialization yet — partly because I’ve worn many hats at once — but that’s also what made me adaptable and resourceful. I enjoy figuring things out, fixing real problems, and making tools that actually help people get work done." />

      <Describe value="Now, I’m shifting my focus toward engineering roles — especially in DevOps or infrastructure — where I can combine my coding background with my growing interest in system reliability and automation. I’m always learning, often quietly, but consistently moving forward." />
    </Section>
  );
}

function Certification() {
  return (
    <Section>
      <Title value="Certification" />
      <SubTitle value="Certification what i got it This is very long journey" />
      <List modelItem="certification" dataItems={CertificationItems} />
      <Describe value="  Right now, I focus on building practical, instant solutions. If an open-source tool can solve the problem efficiently, I’ll use it — because I believe time should be spent on solving the right problems, not rebuilding what already works." />
      <Describe value="That said, the background I’ve shared is real — it’s shaped by hands-on experience, continuous learning, and a mindset of figuring things out step by step. I may not consider myself an expert or highly advanced, but I’m not afraid to learn, experiment, and take responsibility for real-world problems." />
      <Describe value="My approach is simple: use what works, build what’s missing, and always keep improving — both in code and communication." />
    </Section>
  );
}

function Education() {
  return (
    <Section>
      <Title value="Education" />
      <Describe value="Education what i got it This is also long journey" />
      <List modelItem="education" dataItems={EducationItems} />
    </Section>
  );
}

function Experience() {
  return (
    <Section>
      <Title value="Experience" />
      <Describe value="i’m a developer who learns by doing and listening. Even in short-term roles, I’ve taken on tasks beyond expectations — from building systems to helping set up internal tooling and DevOps workflows. I work best with clarity, and thrive in solving real problems, quietly but effectively." />
      <Describe
        value="Although my journey in tech started recently, I’ve gained a wide range of experience in a short time. I’m someone who learns by listening, observing, and doing — even though I’m not the type to talk much, I take action where it counts.
        I’ve handled tasks that often go beyond the scope of an intern: from developing systems, fixing bugs, and building automation scripts, to helping with DevOps setup and IT support infrastructure. These experiences shaped me into a flexible developer — capable of adapting, supporting teams, and contributing ideas to solve both technical and operational challenges.

        As an introvert, I work best with clear instructions and focused tasks. I may not specialize deeply in one area (yet), but my exposure to various responsibilities has made me resourceful and well-rounded. I enjoy working behind the scenes — solving problems, improving systems, and constantly learning something new."
      />
      <List modelItem="experience" dataItems={ExperienceItems} />
    </Section>
  );
}

function Coding() {
  const { isLoading } = useLoading(true, 500);
  return (
    <WraperContent>
      {isLoading ? (
        <Skeleton count={10} width={500} />
      ) : (
        <>
          <SectionHeader
            title="Github Activity"
            description="coding activity at github"
            link="https://github.com/naagaraa"
          />
          <div className="justify-center">
            <Image
              className="w-full"
              src="https://ghchart.rshah.org/naagaraa"
              alt="GitHub Contributions"
              // Set the width according to your requirements
              width={800}
              height={200}
              // layout="responsive"
              priority
              unoptimized={true}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <Describe
            value=" I'm longer move coding activity to gitlab, caused 3 years ago I'm
            work for company and they are used gitlab"
          />
          <SectionHeader
            title="Gitlab"
            description="coding activity at gitlab"
            link="https://gitlab.com/naagaraa"
          />
        </>
      )}
    </WraperContent>
  );
}

export default function About() {
  return (
    <>
      <motion.div>
        <Heading
          name="Eka Jaya Nagara"
          title="Software Developer / IT Support"
          stack={{
            available: true,
            title: "PHP - JS - Laravel - React - Firebase",
          }}
        />
      </motion.div>
      <motion.div>
        <Story />
      </motion.div>
      <motion.div>
        <Certification />
      </motion.div>
      <motion.div>
        <Education />
      </motion.div>
      <motion.div>
        <Experience />
      </motion.div>
    </>
  );
}
