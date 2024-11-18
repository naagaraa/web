
import { HeadingProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";
export default function Heading({
    name, title, stack
}: HeadingProps) {

    const { isLoading } = useLoading(true, 500)

    return (
        <>
            <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10 md:pb-10">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
                    <div className="max-w-3xl text-start">
                        <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
                            {isLoading ? <Skeleton width={100} /> : name}
                        </h1>
                        <p className="mt-4 max-w-xl sm:text-xl/relaxed">
                            {isLoading ? <Skeleton width={300} /> : title}
                        </p>
                        <p className="mt-1 mb-3">{isLoading ? <Skeleton width={500} /> : stack?.title}</p>
                    </div>
                </div>
            </section>
        </>
    );
}