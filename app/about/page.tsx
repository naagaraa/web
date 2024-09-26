"use client";

import React from "react";

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
          <div className="max-w-3xl text-start">
            <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
              Eka Jaya Nagara
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Software Engineer
            </p>
            <p className="mt-1 mb-3">PHP - Laravel - JS - React</p>
          </div>
        </div>
      </section>
      <section className="grid items-start sm:items-start justify-items-center mt-10 mb-36">
        <div className="w-2/4">
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
