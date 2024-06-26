import type { Category } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-intl';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { CategoryLink } from '@/components';
import { IconSearchCaret } from '@/icons';
import { Button } from '@/ui';

import styles from './MainPanel.module.scss';

const INITIAL_ITEMS_SHOWN = 5;

type Props = {
    filteredCategories: Category[];
    onCategoryClick: () => void;
};

function CategoriesList({ filteredCategories, onCategoryClick }: Props) {
    const [showAllCategories, setShowAllCategories] = useState(false);

    const displayedCategories = useMemo(
        () =>
            showAllCategories
                ? filteredCategories
                : filteredCategories.slice(0, INITIAL_ITEMS_SHOWN),
        [filteredCategories, showAllCategories],
    );

    function toggleCategories() {
        return setShowAllCategories((s) => !s);
    }

    return (
        <>
            <p className={styles.title}>
                <FormattedMessage {...translations.categories.title} />
            </p>

            <ul className={styles.list}>
                {displayedCategories.map((category) => (
                    <li key={category.id} className={styles.listItem}>
                        <CategoryLink
                            category={category}
                            className={styles.categoryLink}
                            onClick={onCategoryClick}
                        />
                    </li>
                ))}
            </ul>

            {filteredCategories.length > INITIAL_ITEMS_SHOWN && (
                <Button
                    onClick={toggleCategories}
                    variation="navigation"
                    className={classNames(styles.link, styles.viewMoreCategoriesLink)}
                >
                    {showAllCategories ? (
                        <FormattedMessage {...translations.search.viewLess} />
                    ) : (
                        <FormattedMessage {...translations.search.viewMore} />
                    )}
                    <IconSearchCaret
                        width={16}
                        height={16}
                        className={classNames(styles.caret, {
                            [styles.caretOpen]: showAllCategories,
                        })}
                    />
                </Button>
            )}
        </>
    );
}

export default CategoriesList;
