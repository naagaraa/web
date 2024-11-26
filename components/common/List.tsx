import React, { lazy, Suspense } from 'react'
import { ListProps } from '@/types/components/types'
import Skeleton from 'react-loading-skeleton'

type LazyComponentLoader = () => Promise<{ default: React.FC<{ dataItems: any }> }>;
const componentsMap: Record<string, LazyComponentLoader> = {
    // lazy loading
    // modelitems => import components
    education: () => import('@/components/UI/list/ListEducation'),
    education_project: () => import('@/components/UI/list/ListEducationProject'),
    certification: () => import('@/components/UI/list/ListCertification'),
    experience: () => import('@/components/UI/list/ListXperience'),
    paid_project: () => import('@/components/UI/list/ListPaidProject'),
    video_youtube: () => import('@/components/UI/list/ListVideoYoutube'),
};

export default function List({ modelItem, dataItems }: ListProps) {
    const LazyComponent = componentsMap[modelItem];
    if (!LazyComponent) {
        return <p>Model Not Valid</p>;
    }

    const Component = lazy(LazyComponent);
    return (
        <Suspense fallback={<Skeleton />}>
            <Component dataItems={dataItems} />
        </Suspense>
    );
}

