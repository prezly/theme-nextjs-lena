import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';
import StoryPublicationDate from '../StoryPublicationDate';

import styles from './StoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function StoryCard({ story }: Props) {
    const { categories, title, subtitle } = story;
    const { showDate, showSubtitle } = useThemeSettings();

    return (
        <Link href={`/${story.slug}`} locale={false} passHref>
            <a className={styles.container}>
                <div className={styles.imageWrapper}>
                    <StoryImage
                        story={story}
                        className={styles.image}
                        placeholderClassName={styles.placeholder}
                    />
                </div>
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
                    <h3 className={styles.title}>{title}</h3>

                    {subtitle && showSubtitle && <p className={styles.subtitle}>{subtitle}</p>}

                    {showDate && (
                        <p className={styles.date}>
                            <StoryPublicationDate story={story} />
                        </p>
                    )}
                </div>
            </a>
        </Link>
    );
}

export default StoryCard;
