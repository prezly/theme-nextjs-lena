import type { IndexedStory } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { StateResultsProvided } from 'react-instantsearch-core';
import { Hits } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';

import { ButtonLink } from '@/ui';

import Hit from './Hit';

import styles from './MainPanel.module.scss';

type Props = Pick<StateResultsProvided<IndexedStory>, 'searchResults'> & {
    query?: string;
};

function SearchResults({ searchResults, query }: Props) {
    const totalResults = searchResults?.nbHits ?? 0;
    const { asPath } = useRouter();
    const isOnSearchPage = asPath.startsWith('/search');

    return (
        <>
            <p className={classNames(styles.title, { [styles.empty]: !totalResults })}>
                {totalResults ? (
                    <FormattedMessage {...translations.search.resultsTitle} />
                ) : (
                    <FormattedMessage {...translations.search.noResults} />
                )}
            </p>
            <Hits hitComponent={Hit} />
            {totalResults > 3 && (
                <ButtonLink
                    href={`/search?query=${query}`}
                    variation="navigation"
                    className={styles.link}
                    forceRefresh={isOnSearchPage}
                >
                    <FormattedMessage {...translations.search.showAllResults} />
                </ButtonLink>
            )}
        </>
    );
}

export default SearchResults;
