import React from 'react'
import useLoading from '@/composables/hook/useLoading';
import Skeleton from 'react-loading-skeleton';
import { PaidProjectProps } from '@/types/components/types';

export default function ListPaidProject({ dataItems }: PaidProjectProps) {
    const { isLoading } = useLoading(true, 500);
    return (
        <div>
            <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {
                    isLoading ? <Skeleton count={dataItems?.length} /> :
                        dataItems?.map((value, index) => (
                            <li key={index}>
                                See Detail - {value.title} - {value.jobs}, Tahun {value.date} - Stack:
                                {" " + value.stack}
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}