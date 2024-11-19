"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "@/components/UI/Heading";
import WrapperContentSlide from "@/components/UI/WrapperContentSlide";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import CardProject from "@/components/UI/CardProject";
import useSlideScreen from "@/composables/hook/useSlideScreen";
import { OpenSourceProject } from "@/data/OpenSourceProject";
import Skeleton from "react-loading-skeleton";

function Project() {
  const { slidesPerView } = useSlideScreen();

  return (
    <WrapperContentSlide>
      <Title value="Project" />
      <SubTitle value="This Portofolio Project What I build in Open Source / Personal Project Slide for check another" />

      <Suspense fallback={<Skeleton />}>
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        >
          {OpenSourceProject.map((value, index) => (
            <SwiperSlide key={index}>
              <CardProject
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
    </WrapperContentSlide>



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
