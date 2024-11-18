import React from 'react'
import { titleProps } from '@/types/components/types'
export default function Title({ value }: titleProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {value}
            </h1>
        </div>
    )
}
