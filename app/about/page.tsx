"use client";

import React from "react";
import Heading from "@/components/UI/Heading";
import { CertificationItems } from "@/data/Certification";
import { EducationItems } from "@/data/Education";

function Story() {
  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-10 mb-10">
        <div className="w-4/5 md:w-2/4">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="mt-10 mb-3">
            I am a dedicated Information Technology student with a robust
            foundation in programming and technical support. Over the past three
            years, I have honed my skills in PHP, further expanding my expertise
            by diving into languages such as Bash, Java, JavaScript, Python, and
            TypeScript. Recently, I have returned to PHP, specializing in
            Laravel, where I’ve been able to leverage my programming skills to
            create dynamic web applications.
          </p>
          <p className="mt-10 mb-3">
            My technical proficiency is complemented by a solid understanding of
            virtualization technologies, including VMware and VirtualBox. I
            develop primarily on Ubuntu OS, allowing me to harness the power of
            open-source tools for effective software development.
          </p>
          <p className="mt-10 mb-3">
            In addition to my programming capabilities, I bring a wealth of
            experience in IT support, including server migration and network
            administration. My background equips me to solve complex problems
            and provide effective solutions, ensuring optimal system
            performance.
          </p>
          <p className="mt-10 mb-3">
            I am passionate about continuous learning and thrive in
            collaborative environments, always eager to embrace new challenges
            in the ever-evolving tech landscape.
          </p>
        </div>
      </section>
    </>
  );
}

function Certification() {
  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-5 mb-10">
        <div className="w-4/5 md:w-2/4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                Certification
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Certification what i got it This is very long journey
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {CertificationItems.map((value, index) => (
                  <li key={index}>
                    {value.date} - {value.title} - {value.academy},{" "}
                    {value.Instructor}
                    {value.part?.length > 0 && (
                      <>
                        <h5 className="font-bold text-small my-2">
                          Part Certification of {value.title}
                        </h5>
                        <ul className="ml-5 mb-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                          {value.part.map((part, index) => (
                            <li key={index}>{part}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm text-gray-500">
                That Very Long Journey Right?, and Why I am Not have actually
                have a lot profesional Project cause this, long journey in
                academic, and currently i am try learn English A1 - B2, focus
                for comunication skill, and learn other technology, like react,
                docker, VM, Network, Linux, Android, Bussiness, Electronic
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function Education() {
  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-5 mb-10">
        <div className="w-4/5 md:w-2/4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                Education
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Education what i got it This is also long journey
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {EducationItems.map((value, index) => (
                  <li key={index}>
                    {value.title} - {value.Prodi} {value.Faculty}, {value.Univ}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function Experience() {
  // const XperienceItems = [
  //   {
  //     date: "2020",
  //     title: "Bachelor of Computer Sains",
  //     Univ: "Univercity Of Darma Persada",
  //     Faculty: "Enggineering",
  //     Prodi: "Technology Information",
  //   },
  // ];

  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-5 mb-36">
        <div className="w-4/5 md:w-2/4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                Experience
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Xperience, This Short Journey, but I'm got a lot of knowledge,
                why cause I'm Listener People, No much too talk
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                <li>Comming Soon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
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
