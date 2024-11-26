"use client";

import React from "react";
import Heading from "@/components/UI/Heading";
import { CertificationItems } from "@/data/Certification";
import { EducationItems } from "@/data/Education";
import Paragraph from "@/components/common/Paragraph";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import Section from "@/components/UI/Section";
import List from "@/components/common/List";
import { ExperienceItems } from "@/data/Experience";
import Link from "next/link";
import { RouteName } from "@/routes/navigation";
import Describe from "@/components/common/Describe";

function Story() {
  return (
    <Section>
      <Title value="About Me" />
      <Describe
        value="I am a dedicated Information Technology student with a robust
            foundation in programming and technical support. Over the past three
            years, I have honed my skills in PHP, further expanding my expertise
            by diving into languages such as Bash, Java, JavaScript, Python, and
            TypeScript. Recently, I have returned to PHP, specializing in
            Laravel, where I’ve been able to leverage my programming skills to
            create dynamic web applications."
      />
      <Describe
        value="My technical proficiency is complemented by a solid understanding of
            virtualization technologies, including VMware and VirtualBox. I
            develop primarily on Ubuntu OS, allowing me to harness the power of
            open-source tools for effective software development."
      />
      <Describe
        value="In addition to my programming capabilities, I bring a wealth of
            experience in IT support, including server migration and network
            administration. My background equips me to solve complex problems
            and provide effective solutions, ensuring optimal system
            performance."
      />

      <Describe
        value="I am passionate about continuous learning and thrive in
            collaborative environments, always eager to embrace new challenges
            in the ever-evolving tech landscape."
      />
    </Section>
  );
}

function Certification() {
  return (
    <Section>
      <Title value="Certification" />
      <SubTitle value="Certification what i got it This is very long journey" />
      <List modelItem="certification" dataItems={CertificationItems} />
      <Describe
        value="That Very Long Journey Right?, and Why I am Not have actually
                have a lot profesional Project cause this, long journey in
                academic, and currently i am try learn English A1 - B2, focus
                for comunication skill, and learn other technology, like react,
                docker, VM, Network, Linux, Android, Bussiness, Electronic"
      />
      <Describe
        value=" Currently, i just learn 3 things, english skill, vue/nuxtjs and flutter for developer skill
        and in day by day but not often i'am try build digital product about system information
        with laravel and inertia, modular monolit architecture. pure laravel not used filament.
        for frontend used tailwind and boostrap5. for database mysql or pgsql. you can check project at"
        link={RouteName.project_paid}
        linkText="Paid Project"
      />

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
      <Describe
        value="experience, This Short Journey, but I'm got a lot of knowledge,
                why cause I'm Listener People, No much too talk"
      />
      <Describe value="see like senior in technical right to much 
      jobdesk? hahaha. that's make me grow up in tech but is enough. i'am introvert just give me
      task with clear intruction, that's well make me easy to understand how to something.
      i'm type introvert not much to talk. that's have minus i got a lot experience but never got specialist, cause to much task haha at the sametimes" />
      <List modelItem="experience" dataItems={ExperienceItems} />
    </Section>
  );
}

export default function About() {
  return (
    <>
      <Heading
        name="Eka Jaya Nagara"
        title="Software Developer"
        stack={{
          available: true,
          title: "PHP - JS/TS - LARAVEL - VUE",
        }}
      />
      <Story />
      <Certification />
      <Education />
      <Experience />
    </>
  );
}
