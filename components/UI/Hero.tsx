import { HeroProps } from "@/types/components/types";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useLoading from "@/composables/hook/useLoading";
export default function Hero({
    name, title, stack
}: HeroProps) {

    // loading
    const { isLoading } = useLoading(true, 500);

    return (
        <>
            <section className="grid hero-content text-center items-start sm:items-start justify-items-center mt-36">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">{isLoading ? <Skeleton width={300} /> : name}</h1>
                    <p className="py-3">{isLoading ? <Skeleton width={200} /> : title}</p>
                    {stack ? (
                        <p className="py-3 -mt-2 mb-3">{isLoading ? <Skeleton width={300} /> : stack.title}</p>
                    ) : (
                        <p className="py-3 -mt-2 mb-3">null</p>
                    )}
                </div>
            </section>
        </>
    );
}