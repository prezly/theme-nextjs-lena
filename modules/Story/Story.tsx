import type { ExtendedStory } from '@prezly/sdk';
import { TextAlignment } from '@prezly/story-content-format';
import { isEmbargoStory } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import { StoryLinks, StoryPublicationDate } from '@/components';
import { useDevice, useThemeSettings } from '@/hooks';
import { getHeaderAlignment } from '@/utils';

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

    const { categories, links, visibility } = story;
    const headerImage = story.header_image ? JSON.parse(story.header_image) : null;
    const hasHeaderImage = Boolean(headerImage);
    const hasCategories = categories.length > 0;
    const nodes = JSON.parse(story.content);

    const headerAlignment = getHeaderAlignment(nodes);

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
                        <p
                            className={classNames(styles.date, {
                                [styles.left]: headerAlignment === TextAlignment.LEFT,
                                [styles.right]: headerAlignment === TextAlignment.RIGHT,
                                [styles.center]: headerAlignment === TextAlignment.CENTER,
                            })}
                        >
                            <StoryPublicationDate story={story} />
                        </p>
                    )}
                    {isTablet && url && visibility === 'public' && (
                        <StoryLinks url={url} title={story.title} summary={story.summary} />
                    )}
                    <ContentRenderer nodes={nodes} story={story} />
                </div>
            </article>
            {!isTablet && url && visibility === 'public' && (
                <StoryLinks url={url} title={story.title} summary={story.summary} />
            )}
        </Layout>
    );
}

export default Story;
