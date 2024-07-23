import type { SearchSettings } from '@prezly/theme-kit-core/server';
import { getSearchPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

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

export const getServerSideProps = getSearchPageServerSideProps<ExtraProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
        searchSettings: newsroomContextProps.searchSettings,
    }),
);

export default SearchResultsPage;
