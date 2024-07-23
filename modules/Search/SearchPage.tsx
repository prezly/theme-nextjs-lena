import type { SearchSettings } from '@prezly/theme-kit-core/server';
import { useCurrentLocale, useSearchClient } from '@prezly/theme-kit-nextjs';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import Layout from '../Layout';

import AlgoliaStateContextProvider from './components/AlgoliaStateContext';
import Results from './components/Results';
import Title from './components/Title';
import type { SearchState } from './utils';
import { createUrl, queryToSearchState, searchStateToQuery } from './utils';

import styles from './SearchPage.module.scss';

interface Props {
    settings: SearchSettings;
}

const DEBOUNCE_TIME_MS = 300;

function SearchPage({ settings }: Props) {
    const currentLocale = useCurrentLocale();
    const searchClient = useSearchClient(settings);

    const { query, push } = useRouter();
    const [searchState, setSearchState] = useState<SearchState>(queryToSearchState(query));
    const debouncedSetStateRef = useRef<number>();

    const filters =
        settings.searchBackend === 'algolia'
            ? `attributes.culture.code:${currentLocale.toUnderscoreCode()}`
            : `attributes.culture.code=${currentLocale.toUnderscoreCode()}`;

    function onSearchStateChange(updatedSearchState: SearchState) {
        if (typeof window === 'undefined') {
            return;
        }

        window.clearTimeout(debouncedSetStateRef.current);

        debouncedSetStateRef.current = window.setTimeout(() => {
            push({ query: searchStateToQuery(updatedSearchState) }, undefined, {
                shallow: true,
            });
        }, DEBOUNCE_TIME_MS);

        setSearchState(updatedSearchState);
    }

    return (
        <Layout>
            <InstantSearch
                searchClient={searchClient}
                indexName={settings.index}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createUrl}
            >
                <Configure hitsPerPage={6} filters={filters} />
                <AlgoliaStateContextProvider>
                    <Title />
                    <div className={styles.container}>
                        <Results />
                    </div>
                </AlgoliaStateContextProvider>
            </InstantSearch>
        </Layout>
    );
}

export default SearchPage;
