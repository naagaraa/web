"use client";

import React from "react";
import Heading from "@/components/UI/Heading";
import { PaidProjectItems } from "@/data/PaidProject";

function Project() {

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
                {PaidProjectItems.map((value, index) => (
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
      <Heading name="Paid Project" title=" All My Project in Paid Work as Kuli (remote work) / Freelance" />
      <Project />
    </>
  );
}
