"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useLoading from "@/composables/hook/useLoading";
import "plyr-react/plyr.css";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/UI/Hero";
import { sectionHeaderProps, listMusicProps } from "@/types/components/types";

import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import { CertificationItems } from "@/data/Certification";
import WraperContent from "@/components/UI/WrapperContent";
import List from "@/components/common/List";

function SectionHeader({
  title = "",
  description = "",
  link = "/",
}: sectionHeaderProps) {
  return (
    <>
      <div className="mb-5 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Title value={title} />
          <SubTitle value={description} />
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

function Coding() {
  const { isLoading } = useLoading(true, 500);
  return (
    <WraperContent>
      {isLoading ? (
        <Skeleton count={10} width={500} />
      ) : (
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
                height: "auto",
              }}
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
        </>
      )}
    </WraperContent>
  );
}

function Certification() {
  const CertificationItem = CertificationItems.slice(0, 5);
  const { isLoading } = useLoading(true, 500);
  return (
    <>
      <WraperContent>
        {isLoading ? (
          <Skeleton count={10} width={500} />
        ) : (
          <>
            <p className="text-sm mb-5 mt-5">
              This Website Build with Nextjs and Netlify, Journey Learn Modern
              Framework like React or Vue. I don't know what actually state and
              props drill work, and also in react like re render how to keep
              optimize perfomance, what best solution for faster developement
            </p>
            <Title value="Certification" />
            <SubTitle
              value="Certification what i got it, you can see in detail
                For Check About My Long Journey"
              externalLink={{
                value: "about",
                route: "/about",
              }}
            />
            <List modelItem="certification" dataItems={CertificationItem} />
          </>
        )}
      </WraperContent>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero
        name="Eka Jaya Nagara"
        title="Software Engineer"
        stack={{
          available: true,
          title: "PHP - JS/TS - LARAVEL - Vue",
        }}
      />
      <Certification />
      <Coding />
    </>
  );
}
