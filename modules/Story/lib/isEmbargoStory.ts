import { Story } from '@prezly/sdk';

import type { EmbargoStory } from '../types';

export function isEmbargoStory(story: Story): story is EmbargoStory {
    return Story.isScheduledEmbargo(story);
}
