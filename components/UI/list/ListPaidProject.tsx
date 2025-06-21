import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import useLoading from "@/composables/hook/useLoading";
import { PaidProjectProps } from "@/types/components/types";
import { RouteName } from "@/routes/navigation";

export default function ListPaidProject({ dataItems }: PaidProjectProps) {
  const { isLoading } = useLoading(true, 500);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Skeleton count={dataItems?.length || 3} height={20} className="mb-2" />
      </div>
    );
  }

  return (
    <ul className="mt-5 space-y-4 text-sm text-gray-800 dark:text-gray-300">
      {dataItems?.map((item, idx) => {
        const key = `paid-${item.id}-${idx}`;
        const isExternal = item.link && item.link.trim() !== "";
        const href = isExternal
          ? RouteName?.product
          : `/project/paid/${item.id}`;

        return (
          <li key={key} className="flex items-start gap-2">
            <Link
              href={href}
              className="text-red-600 font-semibold hover:underline shrink-0"
            >
              See Detail
            </Link>
            <span className="flex-1 text-black">
              {item.title} — <span className="font-medium">{item.jobs}</span>,{" "}
              {item.date}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
