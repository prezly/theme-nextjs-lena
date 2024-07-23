import type { IndexedStory } from '@prezly/theme-kit-core';
import { useNewsroom } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';
import classNames from 'classnames';

import { type CardSize, getCardImageSizes, getUploadcareImage } from '@/utils';
import type { StoryWithImage } from 'types';

import { getStoryThumbnail } from './lib';

import styles from './StoryImage.module.scss';

type Props = {
    story: StoryWithImage | IndexedStory;
    size: CardSize;
    className?: string;
    placeholderClassName?: string;
};

function StoryImage({ story, size, className, placeholderClassName }: Props) {
    const { name, newsroom_logo: logo } = useNewsroom();
    const image = getStoryThumbnail(story);
    const uploadcareImage = getUploadcareImage(image);

    if (uploadcareImage) {
        return (
            <div className={classNames(styles.imageContainer, className)}>
                <UploadcareImage
                    fill
                    alt={story.title}
                    className={styles.image}
                    src={uploadcareImage.cdnUrl}
                    sizes={getCardImageSizes(size)}
                />
            </div>
        );
    }

    const logoImage = getUploadcareImage(logo);

    return (
        <span className={classNames(styles.placeholder, placeholderClassName)}>
            {logoImage && (
                <UploadcareImage
                    alt="No image"
                    src={logoImage.cdnUrl}
                    className={classNames(styles.placeholderLogo, className)}
                    width={320}
                    height={48}
                />
            )}
            {!logo && name}
        </span>
    );
}

export default StoryImage;
