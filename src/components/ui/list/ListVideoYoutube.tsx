import React from "react";
import useLoading from "@/composables/hook/useLoading";

import { VideoYoutubeProps } from "@/types/components/types";

export default function ListVideoYoutube({ dataItems }: VideoYoutubeProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          dataItems?.map((value, index) => {
            const key = `edu2-${value.title}-${value.Prodi}-${value.Univ}-${index}`;
            return (
              <li className="text-sm" key={key}>
                {value.title} - {value.Prodi} {value.Faculty}, {value.Univ}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
