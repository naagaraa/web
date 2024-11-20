"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "@/components/UI/Heading";
import useSlideScreen from "@/composables/hook/useSlideScreen";
import { ProfesionalProjectItems } from "@/data/ProfesionalProject";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import WrapperContentSlide from "@/components/UI/WrapperContentSlide";
import CardProject from "@/components/UI/card/CardProject";
import Skeleton from "react-loading-skeleton";

function Project() {
  const { slidesPerView } = useSlideScreen(3);
  return (
    <WrapperContentSlide>
      <Title value="Project" />
      <SubTitle value="This Portofolio Project What I build in Profesional Project / Work Experience Slide for check another" />
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
          {ProfesionalProjectItems.map((value, index) => (
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

export default function ProjectProfesional() {
  return (
    <>
      <Heading name="Profesional Project" title="All My Project in Profesional Work onsite and hybrite" />
      <Project />
    </>
  );
}
