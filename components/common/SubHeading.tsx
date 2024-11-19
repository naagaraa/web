import { SubTitleProps } from '@/types/components/types'
import React from 'react'
import useLoading from '@/composables/hook/useLoading'
import Skeleton from 'react-loading-skeleton';

export default function SubHeading({ value }: SubTitleProps) {
    const { isLoading } = useLoading(true, 500);
    return (
        <>
            <h5 className="font-bold text-small my-2">
                {isLoading ? <Skeleton /> : value}
            </h5>
        </>
    )
}
