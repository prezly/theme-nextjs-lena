import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';
import StoryPublicationDate from '../StoryPublicationDate';

import styles from './HighlightedStoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function HighlightedStoryCard({ story }: Props) {
    const { categories, title } = story;
    const { showDate } = useThemeSettings();

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <StoryImage
                    story={story}
                    className={styles.image}
                    placeholderClassName={styles.placeholder}
                />
            </div>
            <div className={styles.overlay}>
                <div>
                    <CategoriesList categories={categories} />
                </div>

                <h2 className={styles.title}>
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a className={styles.titleLink}>{title}</a>
                    </Link>
                </h2>

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
