import { StoryPublicationDate } from '@prezly/themes-ui-components';
import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';

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
                <div className={styles.categoriesList}>
                    <CategoriesList categories={categories} />
                </div>

                <Link href={`/${story.slug}`} locale={false} passHref>
                    <a className={styles.link}>
                        <h2 className={styles.title}>{title}</h2>
                    </a>
                </Link>

                {showDate && (
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a className={styles.link}>
                            <span className={styles.date}>
                                <StoryPublicationDate story={story} />
                            </span>
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default HighlightedStoryCard;
