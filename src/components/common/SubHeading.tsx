import { SubTitleProps } from "@/types/components/types";
import React from "react";
import useLoading from "@/composables/hook/useLoading";

export default function SubHeading({ value }: SubTitleProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <>
      <h5 className="text-small my-2">
        {isLoading ? <div>Loading...</div> : value}
      </h5>
    </>
  );
}
