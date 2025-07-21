"use client";

import React from "react";
import { motion } from "framer-motion";
import Heading from "@/src/components/ui/Heading";
import { EducationItems } from "@/data/Education";
import Title from "@/src/components/common/Title";
import SubTitle from "@/src/components/common/SubTitle";
import List from "@/src/components/common/List";
import { ExperienceItems } from "@/data/Experience";
import Describe from "@/src/components/common/Describe";
import Section from "@/src/components/ui/Section";
import { useTranslations } from "next-intl";
import Footer from "@/src/components/ui/footer";
import CodingSection from "./CodingSection";
import NavTabs from "@/src/components/layout/NavTabs";

function Story() {
  const t = useTranslations("About.Story");
  return (
    <Section>
      <Describe value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
    </Section>
  );
}

function Certification() {
  const t = useTranslations("About.Certification");
  return (
    <Section>
      <Title value={t("title")} />
      <SubTitle value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
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
  const t = useTranslations("About.Experience");
  return (
    <Section>
      <Title value={t("title")} />
      <SubTitle value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
      <List modelItem="experience" dataItems={ExperienceItems} />
    </Section>
  );
}

export default function About() {
  return (
    <>
      <motion.div>
        <Heading
          name="Eka Jaya Nagara"
          title="Ex Software Developer & IT Support"
          stack={{
            available: true,
            title: "PHP - JS - Laravel",
          }}
        />
      </motion.div>
      <motion.div>
        <NavTabs />
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
