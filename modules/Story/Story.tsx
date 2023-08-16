import type { ExtendedStory } from '@prezly/sdk';
import { isEmbargoStory } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import { StoryLinks, StoryPublicationDate } from '@/components';
import { useDevice, useThemeSettings } from '@/hooks';

import Layout from '../Layout';

import { HeaderRenderer } from './HeaderRenderer';

import styles from './Story.module.scss';

const CategoriesList = dynamic(() => import('@/components/CategoriesList'));
const ContentRenderer = dynamic(() => import('@/components/ContentRenderer'));
const Embargo = dynamic(() => import('./Embargo'));

type Props = {
    story: ExtendedStory;
};

const noIndex = process.env.VERCEL === '1';

function Story({ story }: Props) {
    const { showDate } = useThemeSettings();
    const { isTablet } = useDevice();

    if (!story) {
        return null;
    }

    const { categories, links } = story;
    const headerImage = story.header_image ? JSON.parse(story.header_image) : null;
    const hasHeaderImage = Boolean(headerImage);
    const hasCategories = categories.length > 0;
    const nodes = JSON.parse(story.content);

    const url = links.short || links.newsroom_view;

    return (
        <Layout>
            <StorySeo story={story} noindex={noIndex} />
            <article className={styles.story}>
                <div
                    className={classNames(styles.container, {
                        [styles.withImage]: hasHeaderImage,
                    })}
                >
                    {isEmbargoStory(story) && <Embargo story={story} />}
                    {hasCategories && (
                        <div className={styles.categories}>
                            <CategoriesList
                                categories={categories}
                                showAllCategories
                                linkClassName={styles.categoryLink}
                            />
                        </div>
                    )}
                    <HeaderRenderer nodes={nodes} />
                    {showDate && (
                        <p className={styles.date}>
                            <StoryPublicationDate story={story} />
                        </p>
                    )}
                    {isTablet && url && <StoryLinks url={url} />}
                    <ContentRenderer nodes={nodes} />
                </div>
            </article>
            {!isTablet && url && <StoryLinks url={url} />}
        </Layout>
    );
}

export default Story;
