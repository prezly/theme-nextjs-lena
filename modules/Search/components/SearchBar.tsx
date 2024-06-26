import { translations } from '@prezly/theme-kit-intl';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useDevice } from '@/hooks/useDevice';
import { IconCaret, IconFilter } from '@/icons';
import { Button } from '@/ui';

import { AVAILABLE_FACET_ATTRIBUTES } from '../utils';

import Facet from './Facet';
import SearchInput from './SearchInput';

import styles from './SearchBar.module.scss';

function SearchBar() {
    const { formatMessage } = useIntl();
    const [isShown, setIsShown] = useState(false);
    const { isMobile } = useDevice();

    function toggleFacets() {
        return setIsShown((s) => !s);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SearchInput />
                <Button
                    variation="secondary"
                    icon={isMobile ? IconFilter : IconCaret}
                    iconPlacement="right"
                    title={formatMessage(translations.actions.toggleFilters)}
                    onClick={toggleFacets}
                    className={styles.button}
                >
                    {!isMobile && formatMessage(translations.search.filters)}
                </Button>
            </div>
            <div className={classNames(styles.facets, { [styles.facetsOpen]: isShown })}>
                {AVAILABLE_FACET_ATTRIBUTES.map((attribute) => (
                    <Facet
                        key={attribute}
                        attribute={attribute}
                        // This is a hack to make Algolia return more than 10 facets by default. We need to upgrade to v7 to allow finer control over this.
                        showMore
                        showMoreLimit={50}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
