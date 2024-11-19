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


function Story() {
  return (
    <Section>
      <Title value="About Me" />
      <Paragraph value="I am a dedicated Information Technology student with a robust
            foundation in programming and technical support. Over the past three
            years, I have honed my skills in PHP, further expanding my expertise
            by diving into languages such as Bash, Java, JavaScript, Python, and
            TypeScript. Recently, I have returned to PHP, specializing in
            Laravel, where I’ve been able to leverage my programming skills to
            create dynamic web applications." />
      <Paragraph value="My technical proficiency is complemented by a solid understanding of
            virtualization technologies, including VMware and VirtualBox. I
            develop primarily on Ubuntu OS, allowing me to harness the power of
            open-source tools for effective software development." />
      <Paragraph value="In addition to my programming capabilities, I bring a wealth of
            experience in IT support, including server migration and network
            administration. My background equips me to solve complex problems
            and provide effective solutions, ensuring optimal system
            performance." />

      <Paragraph value="I am passionate about continuous learning and thrive in
            collaborative environments, always eager to embrace new challenges
            in the ever-evolving tech landscape." />
    </Section>

  );
}

function Certification() {
  return (
    <Section>
      <Title value="Certification" />
      <SubTitle value="Certification what i got it This is very long journey" />
      <List modelItem="certification" dataItems={CertificationItems} />
      <Paragraph value="That Very Long Journey Right?, and Why I am Not have actually
                have a lot profesional Project cause this, long journey in
                academic, and currently i am try learn English A1 - B2, focus
                for comunication skill, and learn other technology, like react,
                docker, VM, Network, Linux, Android, Bussiness, Electronic" />
    </Section>
  );
}

function Education() {
  return (
    <Section>
      <Title value="Education" />
      <SubTitle value="Education what i got it This is also long journey" />
      <List modelItem="education" dataItems={EducationItems} />
    </Section>
  );
}


function Experience() {
  return (
    <Section>
      <Title value="Experience" />
      <SubTitle value="Xperience, This Short Journey, but I'm got a lot of knowledge,
                why cause I'm Listener People, No much too talk" />
      <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        <li>Comming Soon</li>
      </ul>
    </Section>

  );
}

export default function About() {
  return (
    <>
      <Heading name="Eka Jaya Nagara" title="Software Developer" stack={{
        available: true,
        title: "PHP - JS/TS - LARAVEL - VUE"
      }} />
      <Story />
      <Certification />
      <Education />
      <Experience />
    </>
  );
}
