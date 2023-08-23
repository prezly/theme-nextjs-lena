import type { Category } from '@prezly/sdk';
import translations from '@prezly/themes-intl-messages';
import { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import { CategoryItem } from '../CategoryItem';
import Dropdown from '../Dropdown';

import CategoryLink from './CategoryLink';
import { useCategoriesWithStoriesInCurrentLocale, useRect } from './lib';

import styles from './CategoriesBar.module.scss';

const MORE_BUTTON_WIDTH = +styles.MORE_BUTTON_WIDTH.replace('px', '');

function CategoriesBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { formatMessage } = useIntl();
    const { width: containerWidth } = useRect(containerRef);
    const categories = useCategoriesWithStoriesInCurrentLocale();
    const container = containerRef.current;

    const [visibleCategories, hiddenCategories] = useMemo<[Category[], Category[]]>(() => {
        if (!container) {
            return [categories, []];
        }

        const { paddingLeft, paddingRight } = getComputedStyle(container);
        const containerWidthWithoutPadding =
            containerWidth - parseInt(paddingLeft) - parseInt(paddingRight);

        if (!container || container.scrollWidth <= containerWidthWithoutPadding) {
            return [categories, []];
        }

        let index = 0;
        let width = 0;
        const widthLimit = containerWidthWithoutPadding - MORE_BUTTON_WIDTH;
        const nodesArray = Array.from(container.children);

        for (let i = 0; i < nodesArray.length; i += 1) {
            const { width: nodeWidth } = nodesArray[i].getBoundingClientRect();

            if (nodeWidth + width > widthLimit) {
                break;
            }
            width += nodeWidth;
            index = i + 1;
        }

        return [categories.slice(0, index), categories.slice(index)];
    }, [categories, container, containerWidth]);

    if (!visibleCategories.length) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={containerRef}>
                {visibleCategories.map((category) => (
                    <CategoryLink key={category.id} category={category} />
                ))}
                {hiddenCategories.length > 0 && (
                    <Dropdown
                        label={formatMessage(translations.actions.more)}
                        buttonClassName={styles.more}
                        menuClassName={styles.dropdown}
                    >
                        {hiddenCategories.map((category) => (
                            <CategoryItem category={category} key={category.id} />
                        ))}
                    </Dropdown>
                )}
            </div>
        </div>
    );
}

export default CategoriesBar;
