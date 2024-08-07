import { ACTIONS, useAnalytics } from '@prezly/analytics-nextjs';
import { translations } from '@prezly/theme-kit-intl';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import { useDebouncedCallback } from '@react-hookz/web';
import type { ChangeEvent } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDevice } from '@/hooks/useDevice';
import { IconSearch } from '@/icons';
import { Button, FormInput } from '@/ui';

import styles from './SearchBar.module.scss';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SEARCH_PAGE_URL = 'search';

function SearchBar({ currentRefinement, refine }: Props) {
    const { track } = useAnalytics();
    const { formatMessage } = useIntl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const localeSlug = getLinkLocaleSlug();
    const { isMobile } = useDevice();

    const action = localeSlug ? `/${localeSlug}/${SEARCH_PAGE_URL}` : `/${SEARCH_PAGE_URL}`;

    const trackQuery = useDebouncedCallback(
        (query: string) => {
            track(ACTIONS.SEARCH, { query });
        },
        [track],
        500,
    );

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        refine(query);
        trackQuery(query);
    }

    return (
        <form className={styles.container} method="GET" action={action}>
            <div className={styles.inputWrapper}>
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="off"
                />
                {!currentRefinement.length && (
                    <span className={styles.inputHint}>
                        <FormattedMessage {...translations.search.inputHint} />
                    </span>
                )}
            </div>
            <Button type="submit" variation="secondary" className={styles.button}>
                {isMobile ? (
                    <IconSearch width={14} height={14} className={styles.icon} />
                ) : (
                    <FormattedMessage {...translations.search.action} />
                )}
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchBar);
