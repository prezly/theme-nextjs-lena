import { useAnalyticsContext } from '@prezly/analytics-nextjs';
import type { ExtendedStory } from '@prezly/sdk';
import { StoryFormatVersion } from '@prezly/sdk';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import { StoryPublicationDate } from '@prezly/themes-ui-components';
import Image from '@prezly/uploadcare-image';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import { StoryLinks } from '@/components';
import { useDevice, useThemeSettings } from '@/hooks';
import { getStoryImageSizes } from '@/utils';

import Layout from '../Layout';

import { isEmbargoStory } from './lib';

import styles from './Story.module.scss';

const CategoriesList = dynamic(() => import('@/components/CategoriesList'));
const SlateRenderer = dynamic(() => import('@/components/SlateRenderer'));
const Embargo = dynamic(() => import('./Embargo'));

type Props = {
    story: ExtendedStory;
};

function Story({ story }: Props) {
    const { showDate } = useThemeSettings();
    const { isTablet } = useDevice();
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();

    if (!story) {
        return null;
    }

    const { title, subtitle, content, format_version, categories, links } = story;
    const headerImage = story.header_image ? JSON.parse(story.header_image) : null;
    const hasHeaderImage = Boolean(headerImage);
    const hasCategories = categories.length > 0;

    const url = links.short || links.newsroom_view;

    return (
        <Layout>
            <StorySeo story={story} noindex={!isAnalyticsEnabled} />
            <article className={styles.story}>
                <div
                    className={classNames(styles.container, {
                        [styles.withImage]: hasHeaderImage,
                    })}
                >
                    {hasCategories && (
                        <div className={styles.categories}>
                            <CategoriesList
                                categories={categories}
                                showAllCategories
                                linkClassName={styles.categoryLink}
                            />
                        </div>
                    )}
                    {isEmbargoStory(story) && <Embargo story={story} />}
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                    {showDate && (
                        <p className={styles.date}>
                            <StoryPublicationDate story={story} />
                        </p>
                    )}
                    {headerImage && (
                        <Image
                            alt=""
                            className={styles.mainImage}
                            objectFit="cover"
                            layout="fill"
                            imageDetails={headerImage}
                            sizes={getStoryImageSizes()}
                        />
                    )}
                    {isTablet && url && <StoryLinks url={url} />}
                    {format_version === StoryFormatVersion.HTML && (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === StoryFormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content as string)} />
                    )}
                </div>
            </article>
            {!isTablet && url && <StoryLinks url={url} />}
        </Layout>
    );
}

export default Story;
