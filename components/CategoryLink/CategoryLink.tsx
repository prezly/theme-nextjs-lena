import type { Category } from '@prezly/sdk';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-nextjs';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './CategoryLink.module.scss';

type Props = {
    category: Category | AlgoliaCategoryRef;
    className?: string;
    onClose?: () => void;
};

function CategoryLink({ category, className, onClose }: Props) {
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link href={getCategoryUrl(category, currentLocale)} locale={getLinkLocaleSlug()} passHref>
            <a
                className={classNames(styles.link, className)}
                onClick={onClose}
                onKeyDown={onClose}
                role="button"
            >
                <span>{name}</span>
            </a>
        </Link>
    );
}

export default CategoryLink;
