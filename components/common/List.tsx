import React, { lazy, Suspense } from "react";
import { ListProps } from "@/types/components/types";
import Skeleton from "react-loading-skeleton";

type LazyComponentLoader = () => Promise<{
  default: React.FC<{ dataItems: any }>;
}>;
const componentsMap: Record<string, LazyComponentLoader> = {
  // lazy loading
  // modelitems => import components
  education: () => import("@/components/ui/list/ListEducation"),
  education_project: () => import("@/components/ui/list/ListEducationProject"),
  certification: () => import("@/components/ui/list/ListCertification"),
  experience: () => import("@/components/ui/list/ListXperience"),
  paid_project: () => import("@/components/ui/list/ListPaidProject"),
  video_youtube: () => import("@/components/ui/list/ListVideoYoutube"),
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
