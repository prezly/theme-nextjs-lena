import type { Category } from '@prezly/sdk';
import translations from '@prezly/themes-intl-messages';
import { differenceWith, isEqual } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { CategoryItem } from '../CategoryItem';
import Dropdown from '../Dropdown';

import CategoryLink from './CategoryLink';
import { useCategoriesWithStoriesInCurrentLocale } from './lib';

import styles from './CategoriesBar.module.scss';

function CategoriesBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { formatMessage } = useIntl();
    const initialCategories = useCategoriesWithStoriesInCurrentLocale();
    const [categories, setCategories] = useState({
        nonOverflowing: initialCategories,
        overflowing: [] as Category[],
    });

    useEffect(() => {
        if (categories.overflowing.length > 0) {
            const { nonOverflowing, overflowing } = categories;
            setCategories({
                ...categories,
                nonOverflowing: differenceWith(nonOverflowing, overflowing, isEqual),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories.overflowing]);

    if (!initialCategories.length) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={containerRef}>
                {categories.nonOverflowing.map((category) => (
                    <CategoryLink
                        key={category.id}
                        category={category}
                        containerRef={containerRef}
                        onIsOverflowing={(isOverflowing) => {
                            if (isOverflowing) {
                                setCategories((prev) => ({
                                    ...prev,
                                    overflowing: [...prev.overflowing, category],
                                }));
                            }
                        }}
                    />
                ))}
                {categories.overflowing.length > 0 && (
                    <Dropdown
                        label={formatMessage(translations.actions.more)}
                        buttonClassName={styles.more}
                        menuClassName={styles.dropdown}
                    >
                        {categories.overflowing.map((category) => (
                            <CategoryItem category={category} key={category.id} />
                        ))}
                    </Dropdown>
                )}
            </div>
        </div>
    );
}

export default CategoriesBar;
