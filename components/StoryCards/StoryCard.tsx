import { StoryPublicationDate } from '@prezly/themes-ui-components';
import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';

import styles from './StoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function StoryCard({ story }: Props) {
    const { categories, title, subtitle } = story;
    const { showDate, showSubtitle } = useThemeSettings();

    return (
        <div className={styles.container}>
            <Link href={`/${story.slug}`} locale={false} passHref>
                <a className={styles.imageWrapper}>
                    <StoryImage
                        story={story}
                        className={styles.image}
                        placeholderClassName={styles.placeholder}
                    />
                </a>
            </Link>
            <div className={styles.content}>
                {categories.length > 0 && (
                    <div className={styles.categories}>
                        <CategoriesList
                            categories={categories}
                            isStatic
                            linkClassName={styles.categoryLink}
                        />
                    </div>
                )}
                <h3 className={styles.title}>
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a className={styles.titleLink}>{title}</a>
                    </Link>
                </h3>

                {subtitle && showSubtitle && (
                    <p className={styles.subtitle}>
                        <Link href={`/${story.slug}`} locale={false} passHref>
                            <a className={styles.titleLink}>{subtitle}</a>
                        </Link>
                    </p>
                )}

                {showDate && (
                    <p className={styles.date}>
                        <StoryPublicationDate story={story} />
                    </p>
                )}
            </div>
        </div>
    );
}

export default StoryCard;
