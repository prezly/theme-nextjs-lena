import type { Category } from '@prezly/sdk';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-core';
import { getCategoryUrl, getLocalizedCategoryData } from '@prezly/theme-kit-core';
import { useCurrentLocale, useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './CategoryLink.module.scss';

type Props = {
    category: Category | AlgoliaCategoryRef;
    className?: string;
    onClick?: () => void;
};

function CategoryLink({ category, className, onClick }: Props) {
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link
            href={getCategoryUrl(category, currentLocale)}
            locale={getLinkLocaleSlug()}
            className={classNames(styles.link, className)}
            onClick={onClick}
            onKeyDown={onClick}
        >
            <span>{name}</span>
        </Link>
    );
}

export default CategoryLink;
