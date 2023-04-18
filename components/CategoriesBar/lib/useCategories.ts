import { getCategoryHasTranslation } from '@prezly/theme-kit-core';
import { useCategories, useCurrentLocale } from '@prezly/theme-kit-nextjs';

export function useCategoriesWithStoriesInCurrentLocale() {
    const categories = useCategories();
    const currentLocale = useCurrentLocale();
    return categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );
}
