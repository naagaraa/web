"use client";

import React from "react";

function Heading() {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
          <div className="max-w-3xl text-start">
            <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
              Paid Project
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              All My Project in Paid Work as Kuli (remote work) / Freelance
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Project() {
  const CertificationItems = [
    {
      date: "2020",
      title: "simple image processing ( extraction data to text )",
      academy: "PHP, MYSQL, LARAVEL, tesseract engine ",
      Instructor: "REMOTE",
      part: [],
    },
    {
      date: "2020",
      title: "simple enkrip information use kriptografi alogorithm",
      academy: "PHP, MYSQL",
      Instructor: "REMOTE",
      part: [],
    },
    {
      date: "2020",
      title: "sentiment analysis use NLP tool,",
      academy: "PHP, LARAVEL, NLP",
      Instructor: "REMOTE",
      part: [],
    },
    {
      date: "2020",
      title: "protype IOT automation on off electrict AC/Van and Light",
      academy: "PHP, LARAVEL, BLYNK, ARDUINO C++",
      Instructor: "REMOTE",
      part: [],
    },
    {
      date: "2020",
      title: "protype IOT fire and flood alarms",
      academy: "PHP, LARAVEL, BLYNK, ARDUINO C++",
      Instructor: "REMOTE",
      part: [],
    },
  ];

  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-5 mb-10">
        <div className="w-4/5 md:w-5/6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                All Paid Project
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                I'm Accept Every Project From Task, Website, Apps, and Other, if
                i do that. just do it
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {CertificationItems.map((value, index) => (
                  <li key={index}>
                    See Detail - {value.title} - {value.academy},{" "}
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

              {/* <p className="mt-5 text-sm text-gray-500">
                That Very Long Journey Right?, and Why I am Not have actually
                have a lot profesional Project cause this, long journey in
                academic, and currently i am try learn English A1 - B2, focus
                for comunication skill, and learn other technology, like react,
                docker, VM, Network, Linux, Android, Bussiness, Electronic
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProjectPaid() {
  return (
    <>
      <Heading />
      <Project />
    </>
  );
}
