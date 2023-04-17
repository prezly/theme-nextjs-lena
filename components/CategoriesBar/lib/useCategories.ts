import { getCategoryHasTranslation } from '@prezly/theme-kit-core';
import { useCurrentLocale, useCategories as usePrezlyCategories } from '@prezly/theme-kit-nextjs';

export function useCategories() {
    const categories = usePrezlyCategories();
    const currentLocale = useCurrentLocale();
    return categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );
}
