import type { Category } from '@prezly/sdk';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-core';
import { getLocalizedCategoryData } from '@prezly/theme-kit-core';
import { useCurrentLocale } from '@prezly/theme-kit-nextjs';
import { useEffect, useMemo, useState } from 'react';

import { CategoryLink } from '@/components';

import styles from './CategoriesList.module.scss';

type Props = {
    categories: Category[] | AlgoliaCategoryRef[];
    showAllCategories?: boolean;
    isStatic?: boolean;
    linkClassName?: string;
};

const MAX_CATEGORIES_CHARACTER_LENGTH = 20;

function CategoriesList({ categories, showAllCategories = false, isStatic, linkClassName }: Props) {
    const [showExtraCategories, setShowExtraCategories] = useState(showAllCategories);
    const currentLocale = useCurrentLocale();

    const [visibleCategories, hiddenCategoriesCount] = useMemo(() => {
        if (showExtraCategories) {
            return [categories, 0];
        }

        let characterCounter = 0;
        let lastVisibleCategoryIndex = 0;

        while (
            characterCounter < MAX_CATEGORIES_CHARACTER_LENGTH &&
            lastVisibleCategoryIndex < categories.length
        ) {
            const { name } = getLocalizedCategoryData(
                categories[lastVisibleCategoryIndex],
                currentLocale,
            );
            characterCounter += name.length;

            if (
                characterCounter < MAX_CATEGORIES_CHARACTER_LENGTH ||
                lastVisibleCategoryIndex === 0
            ) {
                lastVisibleCategoryIndex += 1;
            }
        }

        return [
            categories.slice(0, lastVisibleCategoryIndex),
            categories.slice(lastVisibleCategoryIndex).length,
        ];
    }, [categories, showExtraCategories, currentLocale]);

    // This effect is needed to make sure when we update `showAllCategories`
    // the new value is applied. More context on this can be found on:
    // https://github.com/prezly/theme-nextjs-lena/pull/184
    useEffect(() => {
        if (showAllCategories) {
            setShowExtraCategories(true);
        } else {
            setShowExtraCategories(false);
        }
    }, [showAllCategories]);

    return (
        <>
            {visibleCategories.map((category) => (
                <CategoryLink key={category.id} category={category} className={linkClassName} />
            ))}
            {hiddenCategoriesCount > 0 &&
                (isStatic ? (
                    <span className={styles.category}>+{hiddenCategoriesCount}</span>
                ) : (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <span
                        className={styles.categoryLink}
                        onClick={() => setShowExtraCategories(true)}
                        role="button"
                        tabIndex={0}
                    >
                        <span>+{hiddenCategoriesCount}</span>
                    </span>
                ))}
        </>
    );
}

export default CategoriesList;
