import React from "react";
import Link from "next/link";
import { SubTitleProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";

export default function SubTitle({ value, externalLink }: SubTitleProps) {
  const { isLoading } = useLoading(true, 500);

  return (
    <div className="mb-5">
      <p className="mt-1.5 text-sm text-gray-500">
        {isLoading ? <span>Loading...</span> : value}
      </p>
      {externalLink && (
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <Link className="text-red-600 font-bold" href={externalLink.route}>
              {externalLink.value}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
