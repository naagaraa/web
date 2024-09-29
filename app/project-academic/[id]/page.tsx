"use client";

import React from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

// Disable SSR for this component
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// import Plyr from "plyr-react";
import "plyr-react/plyr.css";

type sectionHeaderProps = {
  title: string;
  description: string;
};
function SectionHeader({ title = "", description = "" }: sectionHeaderProps) {
  return (
    <>
      <div className="mb-5 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center gap-4"></div>
      </div>
    </>
  );
}

function Heading({
  title = "",
  description = "",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10">
        <div className="mx-auto max-w-screen-xl px-4 py-36 mb-0 lg:flex md:h-1 lg:items-center">
          <div className="max-w-3xl text-start">
            <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-xl sm:text-xl/relaxed">{description}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function page({ params }: { params: { id: any } }) {
  return (
    <>
      <Heading
        title="orion scanner"
        description="document scanner with tesseract engine and ocr using php"
      />
      <h1 className="hidden">Project ID: {params.id}</h1>
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="items-start gap-4md:items-center md:justify-between">
            <div>
              <section className="music mt-5">
                <SectionHeader
                  title="Project"
                  description="This Portofolio Project What I build in Academic Slide for check another"
                />
                <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                  <Suspense fallback={<Loading />}>
                    <Plyr
                      source={{
                        type: "video",
                        sources: [{ src: "bOJDWDc8t2E", provider: "youtube" }],
                      }}
                    />
                  </Suspense>
                </div>
              </section>
              <section className="mt-5 mb-36">
                <p>
                  build software is not about only about CRUD but evertything.
                  and it's not about tech stack, framework, is it about how to
                  implement algorithm into the program. make algorithm is not
                  about use libraries like you know sci learn in python. but it
                  can make in another language. a good programmer can learn any
                  language but maybe only have one or two language for mastery.
                  and this DEMO my project this is simple, but is so hard for
                  implementation algorithm, need reading, thingking again and
                  again hahaha lol, I am not expert just learner.
                </p>
                <p className="mt-5">
                  every assets and icon what i used this project is not for
                  ecommerce just used for development. what fiture I build for
                  this project ? i am try implementation in two fiture, text
                  scanner and document scanner
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
