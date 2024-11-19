import { ChildrenProps } from '@/types/components/types'
import React from 'react'

export default function WrapperContentSlide({ children }: ChildrenProps) {
    return (
        <>
            <section className="md:mx-auto lg:mx-auto w-full md:w-3/4">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="items-start gap-4 md:items-center md:justify-between">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}
