
import { HeadingProps } from "@/types/components/types";

export default function Heading({
    name, title, stack
}: HeadingProps) {
    return (
        <>
            <section className="bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10 md:pb-10">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex md:h-1 lg:items-center">
                    <div className="max-w-3xl text-start">
                        <h1 className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl">
                            {name}
                        </h1>
                        <p className="mt-4 max-w-xl sm:text-xl/relaxed">
                            {title}
                        </p>
                        <p className="mt-1 mb-3">{stack?.title}</p>
                    </div>
                </div>
            </section>
        </>
    );
}