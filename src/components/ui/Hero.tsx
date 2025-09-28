import { HeroProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
export default function Hero({ name, title, stack }: HeroProps) {
  // loading
  const { isLoading } = useLoading(true, 500);

  return (
    <>
      <section className="grid hero-content text-center items-start sm:items-start justify-items-center mt-36">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">
            {isLoading ? <div>Loading...</div> : name}
          </h1>
          <p className="py-3">{isLoading ? <div>Loading...</div> : title}</p>
          {stack ? (
            <p className="py-3 -mt-2 mb-3">
              {isLoading ? <div>Loading...</div> : stack.title}
            </p>
          ) : (
            <p className="py-3 -mt-2 mb-3">null</p>
          )}
        </div>
      </section>
    </>
  );
}
