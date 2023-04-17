import type { Category } from '@prezly/sdk';
import { getCategoryUrl, getLocalizedCategoryData } from '@prezly/theme-kit-core';
import { useCurrentLocale, useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import { useWindowSize } from '@react-hookz/web';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { ButtonLink } from '@/ui';

import styles from './CategoriesBar.module.scss';

interface Props {
    category: Category;
    containerRef: RefObject<HTMLDivElement>;
    onIsOverflowing: (isOverflowing: boolean) => void;
}

const MORE_BUTTON_WIDTH = +styles.MORE_BUTTON_WIDTH.replace('px', '');

function CategoryLink({ category, containerRef, onIsOverflowing }: Props) {
    const { asPath } = useRouter();
    const { width: windowWidth } = useWindowSize();
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const ref = useRef<HTMLAnchorElement>(null);
    const isActive = asPath.includes(getCategoryUrl(category, currentLocale));

    useEffect(() => {
        const container = containerRef.current;
        const element = ref.current;
        if (container && element) {
            const { right: containerRight } = container.getBoundingClientRect();
            const { right: elementRight } = element.getBoundingClientRect();
            const overflowAmount = containerRight - MORE_BUTTON_WIDTH - elementRight;
            onIsOverflowing(overflowAmount <= 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, ref, windowWidth]);

    return (
        <ButtonLink
            ref={ref}
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
