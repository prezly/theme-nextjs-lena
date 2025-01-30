import type { SearchSettings } from '@prezly/theme-kit-core/server';
import { getSearchPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { NextContentDelivery } from '@prezly/theme-kit-nextjs/server';

import { importMessages } from '@/utils/lang';
import type { BasePageProps } from 'types';

import { isTrackingEnabled } from '../utils';

type ExtraProps = { searchSettings?: SearchSettings };
type Props = BasePageProps & ExtraProps;

const SearchPage = dynamic(() => import('@/modules/Search'), { ssr: true });

const SearchResultsPage: FunctionComponent<Props> = ({ searchSettings }) => {
    if (!searchSettings) {
        notFound();
    }

    return <SearchPage settings={searchSettings} />;
};

export const getServerSideProps = getSearchPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => {
        const api = NextContentDelivery.initClient(context.req);
        const { newsroomContextProps: contextWithContacts } = await api.getNewsroomServerSideProps(
            newsroomContextProps.localeCode,
            undefined,
            true
        );

        console.log('Search page contacts:', contextWithContacts.contacts);

        return {
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(newsroomContextProps.localeCode),
            newsroomContextProps: {
                ...newsroomContextProps,
                contacts: contextWithContacts.contacts ?? null
            },
            searchSettings: newsroomContextProps.searchSettings
        };
    }
);

export default SearchResultsPage;
