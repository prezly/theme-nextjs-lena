import classNames from 'classnames';
import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';
import { StoryPublicationDate } from '../StoryPublicationDate';

import styles from './StoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function StoryCard({ story }: Props) {
    const { categories, title, subtitle } = story;
    const { showDate, showSubtitle } = useThemeSettings();

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <StoryImage
                    story={story}
                    size="default"
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
                <h3
                    className={classNames(styles.title, {
                        [styles.extendedTitle]: !subtitle || !showSubtitle,
                    })}
                >
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a className={styles.titleLink}>
                            <span className={styles.linkMask} />
                            {title}
                        </a>
                    </Link>
                </h3>

                {subtitle && showSubtitle && <p className={styles.subtitle}>{subtitle}</p>}

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
