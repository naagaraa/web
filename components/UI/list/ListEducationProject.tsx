import React from 'react'
import useLoading from '@/composables/hook/useLoading';
import Skeleton from 'react-loading-skeleton';
import { EducationProjectProps } from '@/types/components/types';

export default function ListEducationProject({ dataItems }: EducationProjectProps) {
    const { isLoading } = useLoading(true, 500);
    return (
        <div>
            <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {
                    isLoading ? <Skeleton count={dataItems?.length} /> :
                        dataItems?.map((value, index) => (
                            <li className='text-sm' key={index}>
                                {value.title} - {value.Prodi} {value.Faculty}, {value.Univ}
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}
