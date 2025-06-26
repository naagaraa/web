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
import { useTranslations } from "next-intl";
import Footer from "@/src/components/ui/footer";

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
  const t = useTranslations("About.Story");
  return (
    <Section>
      <Title value={t("title")} />
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
          title="Software Developer & IT Support"
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
      <Footer />
    </>
  );
}
