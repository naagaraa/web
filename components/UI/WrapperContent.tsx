import { ChildrenProps } from "@/types/components/types"
export default function WraperContent({ children }: ChildrenProps) {
    return (
        <>
            <section className="md:mx-auto lg:mx-auto w-full md:w-3/6 ">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-center">
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}