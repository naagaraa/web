"use client";

import React from "react";
import Heading from "@/src/components/ui/Heading";
import { PaidProjectItems } from "@/data/PaidProject";
import Title from "@/src/components/common/Title";
import SubTitle from "@/src/components/common/SubTitle";
import List from "@/src/components/common/List";
import Section from "@/src/components/ui/Section";

function Project() {
  return (
    <Section>
      <Title value="Paid Project" />
      <SubTitle
        value="I'm Accept Every Project From Task, Website, Apps, and Other, if
                i do that. just do it"
      />
      <List modelItem="paid_project" dataItems={PaidProjectItems} />
    </Section>
  );
}

export default function ProjectPaid() {
  return (
    <>
      <Heading
        name="Paid Project"
        title=" All My Project in Paid Work as Kuli (remote work) / Freelance"
      />
      <Project />
    </>
  );
}
