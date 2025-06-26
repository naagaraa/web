import { ChildrenProps } from "@/types/components/types";
export default function WraperContent({ children }: ChildrenProps) {
  return (
    <>
      <section className="w-full max-w-full sm:max-w-2xl md:w-[60%] lg:max-w-4xl xl:max-w-5xl mx-auto ">
        <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-center">
            <div>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
