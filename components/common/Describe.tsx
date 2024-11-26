import React from 'react'
import useLoading from '@/composables/hook/useLoading'
import Skeleton from 'react-loading-skeleton'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type paragraphProps = {
    value?: string
    link?: Url
    linkText?: string
}
export default function Describe({ value, link, linkText }: paragraphProps) {
    const { isLoading } = useLoading(true, 500)
    return (
        <div>
            {isLoading ? <Skeleton /> : (
                <p className="text-sm mb-5 mt-5 text-justify">
                    {value}
                    {link && <Link className="text-red-500 mx-2 font-bold" href={link}>{linkText}</Link>}
                </p>
            )}
        </div>
    )
}
