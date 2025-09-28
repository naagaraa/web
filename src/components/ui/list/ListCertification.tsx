import React from "react";
import useLoading from "@/composables/hook/useLoading";

import { certificationProps } from "@/types/components/types";
import SubHeading from "../../common/SubHeading";

export default function ListCertification({ dataItems }: certificationProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <div>
      <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          dataItems?.map((value, parentIndex) => {
            const parentKey = `${value.title}-${value.academy}-${value.date}-${parentIndex}`;

            return (
              <li className="text-sm" key={parentKey}>
                {value.date} - {value.title} - {value.academy},{" "}
                {value.Instructor}
                {value.part?.length > 0 && (
                  <>
                    <SubHeading
                      value={`Part Certification of ${value.title}`}
                    />
                    <ul className="ml-5 mb-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                      {value.part.map((part: string, partIndex: number) => {
                        const partKey = `${parentKey}-part-${partIndex}-${part}`;
                        return <li key={partKey}>{part}</li>;
                      })}
                    </ul>
                  </>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
