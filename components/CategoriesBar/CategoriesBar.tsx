import {
    getCategoryHasTranslation,
    getLocalizedCategoryData,
    useCategories,
    useCurrentLocale,
} from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import CategoryItem from '@/modules/Layout/Header/CategoriesDropdown/CategoryItem';

import Dropdown from '../Dropdown';

import CategoryLink from './CategoryLink';
import { useCategoryCharacterLimit } from './lib';

import styles from './CategoriesBar.module.scss';

function CategoriesBar() {
    const categories = useCategories();
    const currentLocale = useCurrentLocale();
    const { formatMessage } = useIntl();

    const maxDisplayedCharacters = useCategoryCharacterLimit();

    const filteredCategories = categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );

    const [visibleCategories, hiddenCategoriesCount] = useMemo(() => {
        let characterCounter = 0;
        let lastVisibleCategoryIndex = 0;

        while (
            characterCounter < maxDisplayedCharacters &&
            lastVisibleCategoryIndex < filteredCategories.length
        ) {
            const { name } = getLocalizedCategoryData(
                filteredCategories[lastVisibleCategoryIndex],
                currentLocale,
            );
            characterCounter += name.length;

            if (characterCounter < maxDisplayedCharacters || lastVisibleCategoryIndex === 0) {
                lastVisibleCategoryIndex += 1;
            }
        }

        return [
            filteredCategories.slice(0, lastVisibleCategoryIndex),
            filteredCategories.slice(lastVisibleCategoryIndex).length,
        ];
    }, [filteredCategories, currentLocale, maxDisplayedCharacters]);

    if (!visibleCategories.length) {
        return null;
    }

    const hasMore = hiddenCategoriesCount > 1;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {visibleCategories.map((category) => (
                    <CategoryLink key={category.id} category={category} />
                ))}
                {hasMore && (
                    <Dropdown
                        label={formatMessage(translations.actions.more)}
                        buttonClassName={styles.more}
                        menuClassName={styles.dropdown}
                    >
                        {filteredCategories.slice(-hiddenCategoriesCount).map((category) => (
                            <CategoryItem category={category} key={category.id} />
                        ))}
                    </Dropdown>
                )}
            </div>
        </div>
    );
}

export default CategoriesBar;
