import { HeroProps } from "@/types/components/types";
export default function Hero({
    name, title, stack
}: HeroProps) {


    // if (stack) {
    //     return <p className="py-3 -mt-2 mb-3">{stack.available}</p>
    // }

    return (
        <>
            <section className="grid hero-content text-center items-start sm:items-start justify-items-center mt-36">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <p className="py-3">{title}</p>
                    {stack ? (
                        <p className="py-3 -mt-2 mb-3">{stack.title}</p>
                    ) : (
                        <p className="py-3 -mt-2 mb-3">null</p>
                    )}
                </div>
            </section>
        </>
    );
}