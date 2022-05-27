import type { Category } from '@prezly/sdk';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';

import Button from '../Button';

import styles from './CategoriesBar.module.scss';

interface Props {
    category: Category;
}

function CategoryLink({ category }: Props) {
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Button.Link
            variation="navigation"
            href={getCategoryUrl(category, currentLocale)}
            localeCode={getLinkLocaleSlug()}
            className={styles.link}
        >
            {name}
        </Button.Link>
    );
}

export default CategoryLink;
