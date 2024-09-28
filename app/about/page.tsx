"use client";

import React from "react";

function Heading() {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10 md:pb-10">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
          <div className="max-w-3xl text-start">
            <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
              Eka Jaya Nagara
            </h1>

            <p className="mt-4 max-w-xl sm:text-xl/relaxed">
              Software Engineer
            </p>
            <p className="mt-1 mb-3">PHP - Laravel - JS - React</p>
          </div>
        </div>
      </section>
    </>
  );
}

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
  const CertificationItems = [
    {
      date: "2020",
      title: "CCNA R&S: Introduction to Networks",
      academy: "Cisco",
      Instructor: "Herianto - Darma Persada",
      part: [],
    },
    {
      date: "2020",
      title: "Introduction to Cybersecurity",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
      part: [],
    },
    {
      date: "2020",
      title: "Partner: NDG Linux Unhatched",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
      part: [],
    },
    {
      date: "2020",
      title: "Introduction to IoT",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
      part: [],
    },
    {
      date: "2021",
      title: "IT Essentials: PC Hardware and Software",
      academy: "Cisco",
      Instructor: "Suzuki Syofian - Darma Persada",
      part: [],
    },
    {
      date: "2021",
      title: "Architecting on AWS (Membangun Arsitektur Cloud di AWS)",
      academy: "Dicoding x AWS",
      Instructor: "Dicoding Indonesia",
      part: [],
    },
    {
      date: "2021",
      title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
      academy: "Dicoding x AWS",
      Instructor: "Dicoding Indonesia",
      part: [],
    },
    {
      date: "2021",
      title: "Belajar Dasar Visualisasi Data",
      academy: "Dicoding x Google Developers Authorized Training Partner",
      Instructor: "Dicoding Indonesia",
      part: [],
    },
    {
      date: "2022",
      title: "Administrasi Sistem dan Layanan Infrastruktur TI",
      academy: "Digital Talent x Google X Coursera",
      Instructor: "Google",
      part: [
        "1. Dasar-Dasar Dukungan Teknis (Operating Systems and You: Becoming a Power User)",
        "2. Seluk Beluk Jaringan Komputer (The Ins and Outs of Computer Networks)",
        "3. Sistem Operasi dan Anda: Menjadi Pengguna yang Berdaya (Operating Systems and You: Becoming a Power User)",
        "4. Not Complete",
        "5. Not Complete",
      ],
    },
    {
      date: "2019",
      title: "Belajar Membuat Aplikasi Android untuk Pemula",
      academy: "Dicoding x Google Developers Authorized Training Partner",
      Instructor: "Dicoding Indonesia",
      part: [],
    },
    {
      date: "2019",
      title: "Belajar Dasar Pemrograman Web",
      academy: "Dicoding x Google Developers Authorized Training Partner",
      Instructor: "Dicoding Indonesia",
      part: [],
    },
    {
      date: "2024",
      title: "The Basics of Linux Command Line",
      academy: "Udemy",
      Instructor: "Pragmatic Programmer",
      part: [],
    },
    {
      date: "2023",
      title: "Become a bug bounty hunter",
      academy: "Udemy",
      Instructor: "Andrei Neagoie & Aleksa Tamburkovski, ZTM",
      part: [],
    },
  ];

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
  const CertificationItems = [
    {
      date: "2020",
      title: "Bachelor of Computer Sains",
      Univ: "Univercity Of Darma Persada",
      Faculty: "Enggineering",
      Prodi: "Technology Information",
    },
  ];

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
                {CertificationItems.map((value, index) => (
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
      <Heading />
      <Story />
      <Certification />
      <Education />
      <Experience />
    </>
  );
}
