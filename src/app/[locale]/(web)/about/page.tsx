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
import Image from "next/image";
interface TeamMember {
  name: string;
  role: string;
  icon: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Hiragi Space",
      role: "Insinyur Perangkat Lunak",
      icon: "</>",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // {
    //   name: "Miyuki Nagara",
    //   role: "Founder",
    //   icon: "<>",
    //   image:
    //     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-start">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tim
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Meski berawal dari tim kecil, harapan kami adalah menciptakan manfaat
          luas bagi banyak orang.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center w-48">
              {/* Wrapper utama */}
              <div className="relative group w-44 h-44">
                {/* Foto lingkaran */}
                <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-100 shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>

                {/* Ikon */}
                <div
                  className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold shadow-md transition-all duration-300 ease-out group-hover:animate-orbit"
                  style={{
                    transformOrigin: "center",
                  }}
                >
                  {member.icon}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}

          {/* Placeholder Who’s Next */}
          <div className="flex flex-col items-center w-48">
            <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
              <span className="text-xl font-bold">?</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-600">
              Who’s Next?
            </h3>
            <p className="text-sm text-gray-400">Bergabunglah dengan kami</p>
          </div>
        </div>
      </div>

      {/* Animasi orbit */}
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(38px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(38px) rotate(-360deg);
          }
        }
        .group:hover .animate-orbit {
          animation: orbit 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  );
};

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
          backgroundImage="https://images.unsplash.com/photo-1555043722-4523972f07ee?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Tim Kami"
          title="Kenali Lebih Dekat Tim Kami"
        />
      </motion.div>

      <motion.div>
        <TeamSection />
      </motion.div>
      {/* <motion.div>
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
      </motion.div> */}
    </>
  );
}
