import { SectionPortofolioProps } from "@/types/components/types";
import Image from "next/image";

import { titleProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";

function Title({ value }: titleProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        {isLoading ? <Skeleton /> : value}
      </h1>
    </div>
  );
}

function Describe({ value }: titleProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <p className="mt-4 text-gray-700 text-justify">
        {isLoading ? <Skeleton /> : value}
      </p>
    </div>
  );
}

export default function PortoFolioLeft({
  title,
  paragraph,
  foto,
}: SectionPortofolioProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <>
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
        <div>
          {isLoading ? (
            <Skeleton height={200} />
          ) : (
            <Image
              className="rounded"
              src={foto.image}
              alt={foto.title}
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
          )}
        </div>
        <div>
          <div className="max-w-lg md:max-w-none">
            <Title value={title} />
            <Describe value={paragraph} />
          </div>
        </div>
      </div>
    </>
  );
}
