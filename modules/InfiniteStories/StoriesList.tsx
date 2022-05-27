import { useCompanyInformation, useNewsroom } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { HighlightedStoryCard, StoryCard } from '@/components';
import { useDevice } from '@/hooks/useDevice';
import type { StoryWithImage } from 'types';

import Illustration from '@/public/images/no-stories-illustration.svg';

import styles from './StoriesList.module.scss';

type Props = {
    stories: StoryWithImage[];
    isCategoryList?: boolean;
};

function StoriesList({ stories, isCategoryList = false }: Props) {
    const { name } = useCompanyInformation();
    const { display_name } = useNewsroom();
    const { isTablet } = useDevice();

    const highlightedStoriesLength = isTablet ? 1 : 2;

    const [highlightedStories, restStories] = useMemo(() => {
        if (isCategoryList) {
            return [[], stories];
        }

        return [
            stories.slice(0, highlightedStoriesLength),
            stories.slice(highlightedStoriesLength),
        ];
    }, [isCategoryList, stories, highlightedStoriesLength]);

    if (!highlightedStories.length && !restStories.length) {
        return (
            <div className={styles.noStories}>
                <Illustration />
                <h1 className={styles.noStoriesTitle}>
                    <FormattedMessage
                        {...translations.noStories.title}
                        values={{ newsroom: name || display_name }}
                    />
                </h1>
                <p className={styles.noStoriesSubtitle}>
                    <FormattedMessage {...translations.noStories.subtitle} />
                </p>
            </div>
        );
    }

    return (
        <>
            {highlightedStories.length > 0 && (
                <div className={styles.highlightedStoriesContainer}>
                    {highlightedStories.map((story, index) => {
                        if (index === 0) {
                            return <HighlightedStoryCard key={story.uuid} story={story} />;
                        }
                        return <StoryCard key={story.uuid} story={story} />;
                    })}
                </div>
            )}
            {restStories.length > 0 && (
                <div className={styles.storiesContainer}>
                    {restStories.map((story) => (
                        <StoryCard key={story.uuid} story={story} />
                    ))}
                </div>
            )}
        </>
    );
}

export default StoriesList;
