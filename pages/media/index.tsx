import {
    type GalleryPageProps,
    getGalleryPageServerSideProps,
} from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';
import { NextContentDelivery } from '@prezly/theme-kit-nextjs/server';

import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Galleries = dynamic(() => import('@/modules/Galleries'), { ssr: true });

type Props = BasePageProps & GalleryPageProps;

const GalleriesPage: FunctionComponent<Props> = ({ galleries, pagination }) => (
    <Galleries initialGalleries={galleries} pagination={pagination} />
);

export const getServerSideProps = getGalleryPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => {
        const api = NextContentDelivery.initClient(context.req);
        const { newsroomContextProps: contextWithContacts } = await api.getNewsroomServerSideProps(
            newsroomContextProps.localeCode,
            undefined,
            true
        );

        console.log('Gallery page contacts:', contextWithContacts.contacts);

        return {
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(newsroomContextProps.localeCode),
            newsroomContextProps: {
                ...newsroomContextProps,
                contacts: contextWithContacts.contacts ?? null
            }
        };
    }
);

export default GalleriesPage;
