import { ChildrenProps } from '@/types/components/types'
import React from 'react'

export default function Section({ children }: ChildrenProps) {
    return (
        <>
            <section className="grid items-start sm:items-start justify-items-center mt-5 mb-10 mt-10">
                <div className="w-4/5 md:w-2/4">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                        <div>{children}</div>
                    </div>
                </div>
            </section>
        </>
    )
}
