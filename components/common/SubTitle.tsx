import React from 'react'
import Link from 'next/link'
import { SubTitleProps } from '@/types/components/types'

export default function SubTitle({ value, externalLink }: SubTitleProps) {
    return (
        <div>
            <p className="mt-1.5 text-sm text-gray-500">
                {value}
                {externalLink ? (
                    <Link className="text-red-600 mx-1 font-bold" href={externalLink?.route}>
                        {externalLink?.value}
                    </Link>
                ) : (
                    <div></div>
                )}

            </p>
        </div>
    )
}
