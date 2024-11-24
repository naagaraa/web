"use client";

import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Disable SSR for this component
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Skeleton from "react-loading-skeleton";
import useLoading from "@/composables/hook/useLoading";
import { EducationProjectItems } from "@/data/EducationProject";
import { notFound } from "next/navigation";
import { educationProjectModel } from "@/types/model/education.project";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function Page({ params }: { params: { id: any } }) {
  const [data, setData] = useState<educationProjectModel>();

  useEffect(() => {
    const itemId = parseInt(params.id); // Convert params.id to a number, if necessary
    const item = EducationProjectItems.find((value) => value.id === itemId); // Find the item by id
    console.log("Selected Item:", item);

    if (!item) {
      // If item is not found, trigger a 404
      notFound();
    } else {
      setData(item);
    }
  }, [params.id]);

  const { isLoading } = useLoading(true, 500);

  return (
    <>
      <Heading name={data?.title} title={data?.description} />
      <section className="md:mx-auto lg:mx-auto w-full md:w-3/4">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="items-start gap-4md:items-center md:justify-between">
            <div>
              <section className="music mt-5">
                <Title value={data?.title} />
                <SubTitle value={data?.description} />
                <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                  {/* <Suspense fallback={<Skeleton />}> */}
                  {isLoading ? (
                    <Skeleton />
                  ) : data?.video !== "" ? (
                    <Plyr
                      source={{
                        type: "video",
                        // @ts-expect-error: Plyr's type definition doesn't match source object structure
                        sources: [{ src: data?.video, provider: "youtube" }],
                      }}
                    />
                  ) : null}

                  {/* </Suspense> */}
                </div>
              </section>
              <section className="mt-5 mb-36">
                <p>{data?.content}</p>
                {data?.link?.length >= 0 ? (
                  <Link
                    href={data?.link}
                    className="mt-5 inline-flex btn-sm items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Check Detail
                  </Link>
                ) : null}
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
