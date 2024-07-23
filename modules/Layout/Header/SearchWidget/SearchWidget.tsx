import type { SearchSettings } from '@prezly/theme-kit-core/server';
import { useCurrentLocale, useSearchClient } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import { Modal } from '@/ui';

import { MainPanel, SearchBar } from './components';

import styles from './SearchWidget.module.scss';

interface Props {
    isOpen: boolean;
    className?: string;
    dialogClassName?: string;
    settings: SearchSettings;
    onClose: () => void;
}

function SearchWidget({ isOpen, className, dialogClassName, settings, onClose }: Props) {
    const currentLocale = useCurrentLocale();
    const searchClient = useSearchClient(settings);

    const filters =
        settings.searchBackend === 'algolia'
            ? `attributes.culture.code:${currentLocale.toUnderscoreCode()}`
            : `attributes.culture.code=${currentLocale.toUnderscoreCode()}`;

    return (
        <Modal
            id="search-widget"
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(styles.modal, className)}
            dialogClassName={dialogClassName}
            wrapperClassName={styles.wrapper}
        >
            <InstantSearch searchClient={searchClient} indexName={settings.index}>
                <Configure hitsPerPage={3} filters={filters} />
                <SearchBar />
                <MainPanel onClose={onClose} />
            </InstantSearch>
        </Modal>
    );
}

export default SearchWidget;
