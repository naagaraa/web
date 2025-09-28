import React from "react";
import useLoading from "@/composables/hook/useLoading";
type paragraphProps = {
  value?: string;
};

export default function Paragraph({ value }: paragraphProps) {
  const { isLoading } = useLoading(true, 500);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <p className="mt-10 mb-3">{value}</p>
      )}
    </>
  );
}
