"use client";

import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

// Disable SSR for this component
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Skeleton from "react-loading-skeleton";
import useLoading from "@/composables/hook/useLoading";
import { notFound } from "next/navigation";
import Title from "@/components/common/Title";
import SubTitle from "@/components/common/SubTitle";
import Heading from "@/components/UI/Heading";
import Link from "next/link";

import { paidProjectModel } from "@/types/model/paid.project";
import { PaidProjectItems } from "@/data/PaidProject";
import Image from "next/image";
import landingPage from "@/assets/portofolio-11.jpg";

export default function Page({ params }: { params: { id: any } }) {
  const [data, setData] = useState<paidProjectModel>();

  useEffect(() => {
    const itemId = parseInt(params.id);
    const item = PaidProjectItems.find((value) => value.id === itemId); // Find the item by id
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
      <Heading name={data?.title} />
      {isLoading ? (
        <section className="md:mx-auto lg:mx-auto w-full md:w-3/4">
          <Skeleton count={10} />
        </section>
      ) : (
        <>
          <section className="md:mx-auto lg:mx-auto w-full md:w-3/4">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div className="items-start gap-4md:items-center md:justify-between">
                <div>
                  <section className="music mt-5">
                    <Title value={data?.title} />
                    <SubTitle value={data?.date} />
                  </section>
                  {data?.cover !== "" ? (
                    <section>
                      <Image
                        className="rounded-t-lg"
                        src={data?.cover}
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
                    </section>
                  ) : null}

                  <section className="mt-5 mb-36">
                    <p>{data?.content}</p>
                    {data?.link != "" ? (
                      <Link
                        href={data?.link}
                        className="mt-5 inline-flex btn-sm items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Check Detail
                      </Link>
                    ) : null}
                    <p className="mt-5">
                      <span className="font-semibold">Tech Stack is</span>{" "}
                      {data?.stack}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
