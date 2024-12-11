import React from "react";
import { educationProjectModel } from "@/type/model/education.project";
import { certificationModel } from "@/type/model/certification";
import { paidProjectModel } from "@/type/model/paid.project";
import { EducationModel } from "@/type/model/education";
import { videoYoutubeModel } from "@/type/model/video.youtube";
import { ExperienceModel } from "../model/xperience";

//  children or props
export type ChildrenProps = {
  children?: React.ReactNode;
};

// title Props
export type titleProps = {
  value?: string;
};

// externalLinkProps
export type externalLinkProps = {
  value: string;
  route: string;
};

// subtitle props
export type SubTitleProps = {
  value?: string;
  externalLink?: externalLinkProps;
};

// heading props
export type StackProps = {
  available?: boolean;
  title?: string;
};
export type HeadingProps = {
  name?: string;
  title?: string;
  stack?: StackProps;
};

// hero props
export type HeroProps = {
  name?: string;
  title?: string;
  stack?: StackProps;
};

// sectionHeader Props
export type sectionHeaderProps = {
  title: string;
  description: string;
  link?: string;
};

// list music props
export type listMusicProps = {
  source: string;
  provider?: string;
};

// education model props
export type EducationProps = {
  dataItems?: Array<EducationModel>;
};

// certification model props
export type certificationProps = {
  dataItems?: Array<certificationModel>;
};

export type experienceProps = {
  dataItems?: Array<ExperienceModel>;
};

// education project model props
export type EducationProjectProps = {
  dataItems?: Array<educationProjectModel>;
};

// paid project model props
export type PaidProjectProps = {
  dataItems?: Array<paidProjectModel>;
};

// paid project model props
export type VideoYoutubeProps = {
  dataItems?: Array<videoYoutubeModel>;
};

export type SectionPortofolioProps = {
  title: string;
  paragraph: string;
  foto: {
    image: any;
    title: string;
  };
};
// data list props
export type ListProps = {
  modelItem:
    | "education"
    | "certification"
    | "experience"
    | "education_project"
    | "paid_project"
    | "video_youtube";
  dataItems?: Array<
    | EducationModel
    | certificationModel
    | ExperienceModel
    | educationProjectModel
    | paidProjectModel
    | videoYoutubeModel
  >;
};
