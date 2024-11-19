import React from 'react'
import Link from 'next/link'
import { SubTitleProps } from '@/types/components/types'
import useLoading from '@/composables/hook/useLoading'
import Skeleton from 'react-loading-skeleton'


export default function SubTitle({ value, externalLink }: SubTitleProps) {
    const { isLoading } = useLoading(true, 500)
    return (
        <div>
            <p className="mt-1.5 text-sm text-gray-500">
                {isLoading ? <Skeleton /> : value}
                {externalLink ? (
                    <Link className="text-red-600 mx-1 font-bold" href={externalLink?.route}>
                        {isLoading ? <Skeleton /> : externalLink?.value}
                    </Link>
                ) : (
                    ""
                )}
            </p>
        </div>
    )
}
