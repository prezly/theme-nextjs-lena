import type { Category } from '@prezly/sdk';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ButtonLink } from '@/ui';

import styles from './CategoriesBar.module.scss';

interface Props {
    category: Category;
}

function CategoryLink({ category }: Props) {
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const { asPath } = useRouter();

    const isActive = asPath.includes(getCategoryUrl(category, currentLocale));

    return (
        <ButtonLink
            variation="navigation"
            href={getCategoryUrl(category, currentLocale)}
            localeCode={getLinkLocaleSlug()}
            className={classNames(styles.link, {
                [styles.active]: isActive,
            })}
        >
            {name}
        </ButtonLink>
    );
}

export default CategoryLink;
