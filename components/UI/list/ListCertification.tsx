import React from 'react'
import useLoading from '@/composables/hook/useLoading';
import Skeleton from 'react-loading-skeleton';
import { certificationProps } from '@/types/components/types';

export default function ListCertification({ dataItems }: certificationProps) {
    const { isLoading } = useLoading(true, 500);
    return (
        <div>
            <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {dataItems?.map((value, index) => (
                    <li key={index}>
                        {isLoading ? <Skeleton width={300} /> : `${value.title} - ${value.Prodi} ${value.Faculty}, ${value.Univ}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}
