import React, { lazy, Suspense } from "react";
import { ListProps } from "@/types/components/types";
import Skeleton from "react-loading-skeleton";

type LazyComponentLoader = () => Promise<{
  default: React.FC<{ dataItems: any }>;
}>;
const componentsMap: Record<string, LazyComponentLoader> = {
  // lazy loading
  // modelitems => import components
  education: () => import("../ui/list/ListEducation"),
  education_project: () => import("../ui/list/ListEducationProject"),
  certification: () => import("../ui/list/ListCertification"),
  experience: () => import("../ui/list/ListXperience"),
  paid_project: () => import("../ui/list/ListPaidProject"),
  video_youtube: () => import("../ui/list/ListVideoYoutube"),
};

export default function List({ modelItem, dataItems }: ListProps) {
  const LazyComponent = componentsMap[modelItem];
  if (!LazyComponent) {
    return <p>Model Not Valid</p>;
  }

  const Component = lazy(LazyComponent);
  return (
    <Suspense fallback={<Skeleton />}>
      <Component dataItems={dataItems} />
    </Suspense>
  );
}
