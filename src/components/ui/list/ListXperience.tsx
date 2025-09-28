import React from "react";
import useLoading from "@/composables/hook/useLoading";

import { experienceProps } from "@/types/components/types";
import SubHeading from "../../common/SubHeading";

function SubList({
  value,
  subheading,
}: {
  value: Array<unknown>;
  subheading: string;
}) {
  return (
    <>
      <SubHeading value={subheading} />
      <ul className="ml-5 mb-5 text-sm space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        {value?.map((data: any, index: number) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </>
  );
}

export default function ListExperiencce({ dataItems }: experienceProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          dataItems?.map((value, index) => {
            const baseKey = `${value.title}-${value.company}-${value.date}-${index}`;

            return (
              <li className="list-none" key={baseKey}>
                <p className="text-red-500 font-semibold">{value.date}</p>
                <p className="font-bold">{value.title}</p>
                <p>
                  {value.company} - {value.location}, {value.type}
                </p>

                {value.jobdesk?.length > 0 && (
                  <SubList
                    key={`${baseKey}-jobdesk`}
                    subheading="Jobdesk"
                    value={value.jobdesk}
                  />
                )}
                {value.responsibilty?.length > 0 && (
                  <SubList
                    key={`${baseKey}-responsibility`}
                    subheading="Responsibility"
                    value={value.responsibilty}
                  />
                )}
                {value.skill?.length > 0 && (
                  <SubList
                    key={`${baseKey}-skill`}
                    subheading="Skill"
                    value={value.skill}
                  />
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
