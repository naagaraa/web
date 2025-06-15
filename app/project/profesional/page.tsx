"use client";

import React from "react";
import Heading from "@/components/UI/Heading";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import WrapperContentSlide from "@/components/UI/WrapperContentSlide";
import PortoFolioRIght from "@/components/UI/PortoFolioRIght";
import PortoFolioLeft from "@/components/UI/PortoFolioLeft";
import Porto1 from "@/assets/portofolio-1.jpeg";
import Porto2 from "@/assets/portofolio-2.jpeg";
import Porto3 from "@/assets/portofolio-3.jpeg";
import Porto7 from "@/assets/portofolio-7.jpeg";
import Porto8 from "@/assets/portofolio-8.jpeg";
import Porto9 from "@/assets/portofolio-9.jpg";
import Porto10 from "@/assets/portofolio-10.jpg";
import Porto11 from "@/assets/portofolio-11.jpg";
import Porto12 from "@/assets/portofolio-12.jpg";

function Project() {
  return (
    <WrapperContentSlide>
      <Title value="Project" />
      <SubTitle value="This Portofolio Project What I build in Profesional Project / Work Experience Slide for check another" />
      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioLeft
        title="Website"
        paragraph="this project about maintenance website with codeigniter 3. but maybe now that's can change in this year cause will maintenance with another team. i fix bug paginantion and making indexing. "
        foto={{
          title: "porto",
          image: Porto11,
        }}
      />
      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioRIght
        title="Website"
        paragraph="this frontend, this project about re writing old code cms php native version 5 to php 8 using stack laravel 8"
        foto={{
          title: "porto",
          image: Porto10,
        }}
      />
      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioLeft
        title="Website"
        paragraph="this frontend, this project about re writing old code cms php native version 5 to php 8 using stack laravel 8"
        foto={{
          title: "porto",
          image: Porto9,
        }}
      />

      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioRIght
        title="Custom CMS"
        paragraph="this is a backend this project about re writing old code cms php native version 5 to php 8 using stack laravel 8, the challange database structure is diffrence, but data is not to much just 3 for important. content, contact, and images. the challange i need convert basic logic, database structure, to new tech, and need string manipulate existing content with backlink to new url, remove www.*.com to *.*.com, for finished this need several month, can't remember for sure. i think takes 2 month or 3.5 month"
        foto={{
          title: "porto",
          image: Porto1,
        }}
      />

      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioLeft
        title="PMS"
        paragraph="This Porject Actually not finish, but if see my history xperience working, i work in 2 roles it's hard to manage time with development and infra that's similar like system engineer. but this project about perfomance management system, so basiclly give feedback and rate to employee from employee. simple on the first time. but without bussinee process clear. it making nightmare, and much harder to manage for faster changing"
        foto={{
          title: "porto",
          image: Porto2,
        }}
      />

      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioRIght
        title="PMS"
        paragraph="this for admin management page. sorry i can't share more than this. only separate can i tell for my porto, cause for me this very secret and confindental when i'am not here"
        foto={{
          title: "porto",
          image: Porto3,
        }}
      />

      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioLeft
        title="PMS"
        paragraph="this for employee management page. sorry i can't share more than this. only separate can i tell for my porto, cause for me this very secret and confindental. and keep secret when i'am not here"
        foto={{
          title: "porto",
          image: Porto7,
        }}
      />
      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioRIght
        title="PMS"
        paragraph="this for employee management page. sorry i can't share more than this. only separate can i tell for my porto, cause for me this very secret and confindental"
        foto={{
          title: "porto",
          image: Porto8,
        }}
      />

      <div className="my-10">
        <h1>section</h1>
      </div>
      <PortoFolioLeft
        title="Landing Page"
        paragraph="this about landing page, oil and gas businees, in end of years 2024 from my friends, just ask can u help me making website for my company. i say all right let's go. cause we are in same univercity. he now me. just 1 days for making this"
        foto={{
          title: "porto",
          image: Porto12,
        }}
      />
    </WrapperContentSlide>
  );
}

export default function ProjectProfesional() {
  return (
    <>
      <Heading
        name="Profesional Project"
        title="All My Project in Profesional Work onsite and hybrite"
      />
      <Project />
    </>
  );
}
