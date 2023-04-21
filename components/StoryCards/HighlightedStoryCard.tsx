import Link from 'next/link';

import { useDevice, useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';
import { StoryPublicationDate } from '../StoryPublicationDate';

import styles from './HighlightedStoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function HighlightedStoryCard({ story }: Props) {
    const { categories, title } = story;
    const { showDate } = useThemeSettings();
    const { isTablet } = useDevice();

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <StoryImage
                    story={story}
                    size="big"
                    className={styles.image}
                    placeholderClassName={styles.placeholder}
                />
            </div>
            <div className={styles.overlay}>
                <div>
                    <CategoriesList
                        showAllCategories={!isTablet}
                        categories={categories}
                        linkClassName={styles.categoryLink}
                    />
                </div>

                <Link href={`/${story.slug}`} locale={false} className={styles.link}>
                    <span className={styles.linkMask} />
                    <h2 className={styles.title}>{title}</h2>
                </Link>

                {showDate && (
                    <span className={styles.date}>
                        <StoryPublicationDate story={story} />
                    </span>
                )}
            </div>
        </div>
    );
}

export default HighlightedStoryCard;
