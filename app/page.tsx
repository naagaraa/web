"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Suspense, useEffect, useState } from "react";
import "swiper/css";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useLoading from "@/composables/hook/useLoading";

// Disable SSR for this component
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/UI/Hero";
import { sectionHeaderProps, listMusicProps } from "@/types/components/types";
import { VideoYoutubeItems } from "@/data/VideoYoutube";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import { CertificationItems } from "@/data/Certification";
import WraperContent from "@/components/UI/WrapperContent";
import WrapperContentSlide from "@/components/UI/WrapperContentSlide";

function ListMusic({ source = "", provider = "youtube" }: listMusicProps) {
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
        <Suspense fallback={<Skeleton />}>
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

function SectionHeader({ title = "", description = "", link = "/" }: sectionHeaderProps) {
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


  return (
    <WrapperContentSlide>
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
          {VideoYoutubeItems.map((value, index) => (
            <SwiperSlide key={index}>
              <Suspense fallback={<Skeleton />}>
                <ListMusic
                  source={value.source}
                  provider={value.provider}
                />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </WrapperContentSlide>

  );
}

function Coding() {
  const { isLoading } = useLoading(true, 500)
  return (
    <WraperContent>
      {isLoading ? <Skeleton count={10} width={500} /> : (
        <>
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
              // Set the width according to your requirements
              width={800}
              height={200}
              // layout="responsive"
              priority
              unoptimized={true}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
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
        </>
      )}
    </WraperContent>

  );
}


function Certification() {
  const CertificationItem = CertificationItems.slice(0, 5);
  const { isLoading } = useLoading(true, 500)
  return (
    <>

      <WraperContent>
        {isLoading ? <Skeleton count={10} width={500} /> : (
          <>
            <Title value="Certification" />
            <SubTitle value="Certification what i got it, you can see in detail
                For Check About My Long Journey" externalLink={{
                value: "about",
                route: "/about"
              }} />

            <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
              {CertificationItem.map((value, index) => (
                <li key={index}>
                  {value.title} - {value.academy}, {value.Instructor}
                </li>
              ))}
            </ul>
          </>
        )}
      </WraperContent>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero name="Eka Jaya Nagara" title="Software Engineer" stack={{
        available: true,
        title: "PHP - JS/TS - LARAVEL - Vue"
      }} />
      {/* <Playlist /> */}
      <Certification />
      <Coding />
    </>
  );
}
