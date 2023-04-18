import { getCategoryHasTranslation } from '@prezly/theme-kit-core';
import { useCategories, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import { useMemo } from 'react';

export function useCategoriesWithStoriesInCurrentLocale() {
    const categories = useCategories();
    const currentLocale = useCurrentLocale();

    return useMemo(
        () =>
            categories.filter(
                (category) =>
                    category.stories_number > 0 &&
                    getCategoryHasTranslation(category, currentLocale),
            ),
        [categories, currentLocale],
    );
}
