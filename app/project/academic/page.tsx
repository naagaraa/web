"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "@/components/UI/Heading";
import { EducationProjectItems } from "@/data/EducationProject";
import useSlideScreen from "@/composables/hook/useSlideScreen";
import WrapperContentSlide from "@/components/UI/WrapperContentSlide";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import CardProject from "@/components/UI/card/CardProject";
import Skeleton from "react-loading-skeleton";

function Project() {
  const { slidesPerView } = useSlideScreen(3);
  return (
    <WrapperContentSlide>
      <Title value="Project" />
      <SubTitle value="This Portofolio Project What I build in Academic Slide for check another" />
      <Suspense fallback={<Skeleton />}>
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {EducationProjectItems.map((value, index) => (
            <SwiperSlide key={index}>
              <CardProject
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
    </WrapperContentSlide>
  );
}

export default function ProjectAcademic() {
  return (
    <>
      <Heading name="Project Project" title="all my project in Academic" />
      <Project />
    </>
  );
}
