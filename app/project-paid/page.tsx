"use client";

import 'react-loading-skeleton/dist/skeleton.css'
import React from "react";
import Heading from "@/components/UI/Heading";
import { PaidProjectItems } from "@/data/PaidProject";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import List from "@/components/common/List";
import Section from '@/components/UI/Section';

function Project() {
  return (

    <Section>
      <Title value="Paid Project" />
      <SubTitle value="I'm Accept Every Project From Task, Website, Apps, and Other, if
                i do that. just do it" />
      <List modelItem="paid_project" dataItems={PaidProjectItems} />
    </Section>
  );
}

export default function ProjectPaid() {
  return (
    <>
      <Heading name="Paid Project" title=" All My Project in Paid Work as Kuli (remote work) / Freelance" />
      <Project />
    </>
  );
}
