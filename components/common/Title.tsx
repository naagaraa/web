import React from 'react'
import { titleProps } from '@/types/components/types'
import useLoading from '@/composables/hook/useLoading'
import Skeleton from 'react-loading-skeleton'


export default function Title({ value }: titleProps) {

    const { isLoading } = useLoading(true, 500)
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                {isLoading ? <Skeleton /> : value}
            </h1>
        </div>
    )
}
