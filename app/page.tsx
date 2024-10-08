"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Suspense, useEffect, useState } from "react";
import "swiper/css";
import dynamic from "next/dynamic";

// Disable SSR for this component
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";

function Hero() {
  return (
    <>
      <section className="grid hero-content text-center items-start sm:items-start justify-items-center mt-36">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Eka Jaya Nagara</h1>
          <p className="py-3">Software Engineer</p>
          <p className="-mt-2 mb-3">PHP - Laravel - JS/TS - React</p>
        </div>
      </section>
    </>
  );
}

type listProps = {
  source: string;
  provider?: string;
};

function ListMusic({ source = "", provider = "youtube" }: listProps) {
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        {/* <Suspense fallback={<Loading />}>
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + source}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Suspense> */}
        <Suspense fallback={<Loading />}>
          <Plyr
            source={{
              type: "video",
              // @ts-expect-error: Plyr's type definition doesn't match source object structure
              sources: [{ src: source, provider: provider }],
            }}
          />
        </Suspense>
      </div>
    </>
  );
}

type sectionHeaderProps = {
  title: string;
  description: string;
  link?: string;
};
function SectionHeader({
  title = "",
  description = "",
  link = "/",
}: sectionHeaderProps) {
  return (
    <>
      <div className="mb-5 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            target="_blank"
            href={link}
            className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
            <span className="text-sm font-medium"> View All </span>
          </Link>
          <Link
            target="_blank"
            href={"https://www.youtube.com/@miyukinagara"}
            className="inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
            type="button"
          >
            <span className="text-sm font-medium"> Follow Me </span>
          </Link>
        </div>
      </div>
    </>
  );
}

function Playlist() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setSlidesPerView(2);
    } else if (isBigScreen) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  }, [isDesktopOrLaptop, isBigScreen]);

  const videoItems = [
    {
      source: "d4u7QQ1DYzg",
      provider: "youtube",
    },
    {
      source: "FckmtuCWcm0",
      provider: "youtube",
    },
    {
      source: "YL6amT-XmAg",
      provider: "youtube",
    },
    {
      source: "sJpvWUFyFH4",
      provider: "youtube",
    },
    {
      source: "y6hf8jik6fc",
      provider: "youtube",
    },
    {
      source: "rq30yqhZCQ8",
      provider: "youtube",
    },
    {
      source: "bVZLw3fhBIE",
      provider: "youtube",
    },
    {
      source: "jV-4o5zckhw",
      provider: "youtube",
    },
    {
      source: "iQuEMnVCsTM",
      provider: "youtube",
    },
    {
      source: "hw6tYhE6XzE",
      provider: "youtube",
    },
    {
      source: "Z7cgTzSQiFU",
      provider: "youtube",
    },
  ];

  return (
    <>
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4 mt-36">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="items-start gap-4md:items-center md:justify-between">
            <div>
              <section className="music mt-5">
                <SectionHeader
                  title="Music Favorite"
                  description="Music Favorite, Slide Dams for get more"
                  link="https://music.youtube.com/@miyukinagara"
                />

                <Swiper
                  spaceBetween={20}
                  slidesPerView={slidesPerView}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  // onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log(swiper)}
                >
                  {videoItems.map((value, index) => (
                    <SwiperSlide key={index}>
                      <Suspense fallback={<Loading />}>
                        <ListMusic
                          source={value.source}
                          provider={value.provider}
                        />
                      </Suspense>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Coding() {
  return (
    <>
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="items-start gap-4 md:flex-row md:items-center md:justify-between">
            <SectionHeader
              title="Github Activity"
              description="coding activity at github"
              link="https://github.com/naagaraa"
            />
            <div className="justify-center">
              <Image
                className="w-full"
                src="https://ghchart.rshah.org/naagaraa"
                alt="GitHub Contributions"
                width={800} // Set the width according to your requirements
                height={200}
                // layout="responsive"
                priority
                unoptimized={true}
              />
            </div>
            <p className="text-sm mt-10 mb-10">
              I'm longer move coding activity to gitlab, caused 3 years ago I'm
              work for company and they are used gitlab
            </p>
            <SectionHeader
              title="Gitlab"
              description="coding activity at gitlab"
              link="https://gitlab.com/naagaraa"
            />
          </div>
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
    },
    {
      date: "2020",
      title: "Introduction to Cybersecurity",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
    },
    {
      date: "2020",
      title: "Partner: NDG Linux Unhatched",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
    },
    {
      date: "2020",
      title: "Introduction to IoT",
      academy: "Cisco",
      Instructor: "Jackson Smith - Self Face",
    },
    {
      date: "2021",
      title: "IT Essentials: PC Hardware and Software",
      academy: "Cisco",
      Instructor: "Suzuki Syofian - Darma Persada",
    },
  ];

  return (
    <>
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Certification
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Certification what i got it, you can see in detail{" "}
                <Link className="text-red-600 mx-1 font-bold" href={"/about"}>
                  About me
                </Link>
                For Check About My Long Journey
              </p>

              <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {CertificationItems.map((value, index) => (
                  <li key={index}>
                    {value.title} - {value.academy}, {value.Instructor}
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

export default function Home() {
  return (
    <>
      <Hero />
      <Playlist />
      <Certification />
      <Coding />
    </>
  );
}
