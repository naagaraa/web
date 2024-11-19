import React from 'react'
import useLoading from '@/composables/hook/useLoading';
import Skeleton from 'react-loading-skeleton';
import { certificationProps } from '@/types/components/types';
import SubHeading from '@/components/common/SubHeading';

export default function ListCertification({ dataItems }: certificationProps) {
    const { isLoading } = useLoading(true, 500);
    return (
        <div>
            <ul className="mt-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                {isLoading ? <Skeleton count={dataItems?.length} /> : (
                    dataItems?.map((value, index) => (
                        <li key={index}>
                            {value.date} - {value.title} - {value.academy},{" "}
                            {value.Instructor}
                            {value.part?.length > 0 && (
                                <>
                                    <SubHeading
                                        value={`Part Certification of ${value.title}`}
                                    />
                                    <ul className="ml-5 mb-5 space-y-1 text-gray-700 list-disc list-inside dark:text-gray-700">
                                        {value?.part?.map((part: string, index: number) => (
                                            <li key={index}>{part}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
