import React from "react";
import { titleProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";

export default function Title({ value }: titleProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
        {isLoading ? <div>Loading...</div> : value}
      </h1>
    </div>
  );
}
