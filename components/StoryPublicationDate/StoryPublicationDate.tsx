import type { Story } from '@prezly/sdk';
import type { IndexedStory } from '@prezly/theme-kit-core';
import { getStoryPublicationDate } from '@prezly/theme-kit-core';
import { FormattedDate } from 'react-intl';

interface Props {
    story: Story | IndexedStory;
}

export function StoryPublicationDate({ story }: Props) {
    const date = getStoryPublicationDate(story);

    if (!date) {
        return null;
    }

    return <FormattedDate value={date} year="numeric" month="long" day="numeric" />;
}
