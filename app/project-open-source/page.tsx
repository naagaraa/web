"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Suspense, useEffect, useState } from "react";
import "swiper/css";
import Loading from "@/components/UI/Loading";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/UI/Heading";

type listProps = {
  id: string | number;
  image?: string | { url: string }; // Specify the correct type here
  title?: string;
  description?: string;
  link?: string;
  // other_image?: [] | any;
};

function ListProject({
  id = 1,
  image = "",
  title = "",
  description = "",
  link = "",
}: // other_image,
  listProps) {
  return (<>
    <div
      key={id}
      className="max-w-sm bg-white border border-gray-900 rounded-lg shadow dark:border-gray-900"
    >
      <a href="#">
        <Image
          className="rounded-t-lg"
          src={typeof image === "string" ? image : image?.url}
          alt="GitHub Contributions"
          // Set the width according to your requirements
          width={800}
          height={200}
          priority
          unoptimized={true}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto"
          }} />
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
        <Link
          href={link}
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
        </Link>
      </div>
    </div>
  </>);
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
        "https://eluminoustechnologies.com/blog/wp-content/uploads/2023/11/2.png",
      title: "php libraries",
      description:
        "php libraries common use in final project, see detail for more information",
      link: "https://naagaraa.github.io/web-metode-skripsi/",
      // other_image: [],
    },
    {
      id: "1",
      image:
        "https://eluminoustechnologies.com/blog/wp-content/uploads/2023/11/2.png",
      title: "mini mvc php",
      description:
        "framework php mini project learning php, this long journey, see detail for more information",
      link: "https://nagara.gitbook.io/code-zero-project",
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
                          link={value.link}
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
      <Heading name="Open Source Project" title="All My Project in Open Source or Personal" />
      <Project />
    </>
  );
}
