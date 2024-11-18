"use client";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import React from "react";
import Heading from "@/components/UI/Heading";
import { PaidProjectItems } from "@/data/PaidProject";
import useLoading from "@/composables/hook/useLoading";

function Project() {

  // laoding
  const { isLoading } = useLoading(true, 500);

  return (
    <>
      <section className="grid items-start sm:items-start justify-items-center mt-5 mb-10">
        <div className="w-4/5 md:w-5/6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                {isLoading ? <Skeleton width={100} /> : "Paid Project"}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                {isLoading ? <Skeleton width={300} /> : `I'm Accept Every Project From Task, Website, Apps, and Other, if
                i do that. just do it`}
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {PaidProjectItems.map((value, index) => (
                  <li key={index}>
                    {isLoading ? <Skeleton width={300} /> : `See Detail - ${value.title} - ${value.jobs}, Tahun ${value.date} - Stack:
                    ${" " + value.stack}`}

                    {/* {value.part?.length > 0 && (
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
                    )} */}
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

export default function ProjectPaid() {
  return (
    <>
      <Heading name="Paid Project" title=" All My Project in Paid Work as Kuli (remote work) / Freelance" />
      <Project />
    </>
  );
}
