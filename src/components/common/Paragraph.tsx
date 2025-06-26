import React from 'react'
import useLoading from '@/composables/hook/useLoading'
import Skeleton from 'react-loading-skeleton'

type paragraphProps = {
    value?: string
}

export default function Paragraph({ value }: paragraphProps) {
    const { isLoading } = useLoading(true, 500)
    return (
        <>
            {isLoading ? <Skeleton /> : (
                <p className="mt-10 mb-3">{value}</p>
            )}
        </>
    )
}
