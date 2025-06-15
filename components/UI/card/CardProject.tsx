import React from "react";
import Image from "next/image";
import Link from "next/link";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";
import { RouteName } from "@/routes/navigation";

type listProps = {
  id: string | number;
  image?: string | { url: string }; // Specify the correct type here
  title?: string;
  description?: string;
  link?: string;
  // other_image?: [] | any;
};

export default function CardProject({
  id = 1,
  image = "",
  title = "",
  description = "",
  link = "",
}: listProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div
          key={id}
          className="max-w-sm bg-white border min-h-24 h-4/6 border-gray-900 rounded-lg shadow-md dark:border-gray-900"
        >
          <a href="#">
            <Image
              className="rounded-t-lg"
              src={typeof image === "string" ? image : image?.url}
              alt="images"
              // Set the width according to your requirements
              width={800}
              height={200}
              sizes="(min-width: 808px) 50vw, 100vw"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
              priority
              unoptimized={true}
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-base md:text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                {title.length > 18 ? (
                  <span>{title.substring(0, 18)} ...</span>
                ) : (
                  <span>{title}</span>
                )}
              </h5>
            </a>
            <p className="mb-2 text-justify min-h-28 h-4/6 overflow-hidden text-sm text-gray-700 dark:text-gray-400">
              {description.length > 60 ? (
                <span>{description.substring(0, 60)} ...</span>
              ) : (
                <span>{description}</span>
              )}
            </p>
            <Link
              href={
                link.length > 0 ? link : `${RouteName?.project_academic}/${id}`
              }
              className="inline-flex btn-sm items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              See Detail
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
