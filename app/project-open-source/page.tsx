"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Suspense, useEffect, useState } from "react";
import "swiper/css";
import Loading from "@/components/Loading";
import Image from "next/image";

function Heading() {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
          <div className="max-w-3xl text-start">
            <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
              Open Source Project
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              All My Project in Open Source or Personal
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

type listProps = {
  id: string | number;
  image?: string | { url: string }; // Specify the correct type here
  title?: string;
  description?: string;
  // other_image?: [] | any;
};

function ListProject({
  id = 1,
  image = "",
  title = "",
  description = "",
}: // other_image,
listProps) {
  return (
    <>
      <div
        key={id}
        className="max-w-sm bg-white border border-gray-900 rounded-lg shadow dark:border-gray-900"
      >
        <a href="#">
          <Image
            className="rounded-t-lg"
            src={typeof image === "string" ? image : image?.url}
            alt="GitHub Contributions"
            width={800} // Set the width according to your requirements
            height={200}
            layout="responsive"
            priority
            unoptimized={true}
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            See Detail
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

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

function Project() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setSlidesPerView(3);
    } else if (isBigScreen) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(2);
    }
  }, [isDesktopOrLaptop, isBigScreen]);

  const videoItems = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "project 1",
      description: "project 1",
      // other_image: [],
    },
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "project 1",
      description: "project 1",
      // other_image: [],
    },
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "project 1",
      description: "project 1",
      // other_image: [],
    },
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "project 1",
      description: "project 1",
      // other_image: [],
    },
  ];

  return (
    <>
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4 mb-56 md:mb-10">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="items-start gap-4md:items-center md:justify-between">
            <div>
              <section className="music mt-5">
                <SectionHeader
                  title="Project"
                  description="This Portofolio Project What I build in Open Source / Personal Project Slide for check another"
                />
                <Suspense fallback={<Loading />}>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={slidesPerView}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    // onSlideChange={() => console.log("slide change")}
                    // onSwiper={(swiper) => console.log(swiper)}
                  >
                    {videoItems.map((value, index) => (
                      <SwiperSlide key={index}>
                        <ListProject
                          id={value.id}
                          title={value.title}
                          description={value.description}
                          image={value.image}
                          // other_image={value?.other_image}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Suspense>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default function ProjectOpenSource() {
  return (
    <>
      <Heading />
      <Project />
    </>
  );
}
