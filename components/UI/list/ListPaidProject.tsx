import React from "react";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";
import { PaidProjectProps } from "@/types/components/types";
import Link from "next/link";
import { RouteName } from "@/routes/navigation";

export default function ListPaidProject({ dataItems }: PaidProjectProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        {isLoading ? (
          <Skeleton count={dataItems?.length} />
        ) : (
          dataItems?.map((value, index) => (
            <li className="text-sm" key={index}>
              {value.link !== "" ? (
                <Link
                  className="text-red-500 font-bold px-3"
                  href={`${RouteName?.product}`}
                >
                  See Detail
                </Link>
              ) : (
                <Link
                  className="text-red-500 font-bold px-3"
                  href={`${RouteName?.project_paid}/${value.id}`}
                >
                  See Detail
                </Link>
              )}
              <span>
                {value.title} - {value.jobs}, Years {value.date}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
