import {
    getCategoryHasTranslation,
    useCategories,
    useCurrentLocale,
} from '@prezly/theme-kit-nextjs';

import { useDevice } from '@/hooks/useDevice';
import CategoryItem from '@/modules/Layout/Header/CategoriesDropdown/CategoryItem';

import Dropdown from '../Dropdown';

import CategoryLink from './CategoryLink';

import styles from './CategoriesBar.module.scss';

function CategoriesBar() {
    const categories = useCategories();
    const currentLocale = useCurrentLocale();
    const { isTablet } = useDevice();

    const maxDisplayedCategories = isTablet ? 6 : 10;

    const filteredCategories = categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );

    if (!filteredCategories.length) {
        return null;
    }

    const hasMore = filteredCategories.length > maxDisplayedCategories;

    return (
        <div className={styles.container}>
            <div className="container">
                {filteredCategories.slice(0, maxDisplayedCategories).map((category) => (
                    <CategoryLink key={category.id} category={category} />
                ))}
                {hasMore && (
                    <Dropdown
                        label="More" // TODO: use i18n
                        buttonClassName={styles.more}
                        menuClassName={styles.dropdown}
                    >
                        {filteredCategories.slice(maxDisplayedCategories).map((category) => (
                            <CategoryItem category={category} key={category.id} />
                        ))}
                    </Dropdown>
                )}
            </div>
        </div>
    );
}

export default CategoriesBar;
