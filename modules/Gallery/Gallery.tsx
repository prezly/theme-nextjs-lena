/* eslint-disable @typescript-eslint/no-use-before-define */
import { NewsroomGallery } from '@prezly/sdk';
import { getAssetsUrl, getGalleryThumbnail, getUploadcareGroupUrl } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { ContentRenderer, PageTitle, StoryLinks } from '@/components';

import Layout from '../Layout';

import DownloadLink from './DownloadLink';

import styles from './Gallery.module.scss';

interface Props {
    gallery: NewsroomGallery;
}

export default function Gallery({ gallery }: Props) {
    const { content, name, uploadcare_group_uuid, description } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);
    const [url, setUrl] = useState('');
    const metaDescription = useGalleryPageMetaDescription(gallery);

    useEffect(() => {
        if (typeof window !== undefined) {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <Layout
            title={name}
            imageUrl={galleryThumbnail ? getAssetsUrl(galleryThumbnail.uuid) : undefined}
            description={metaDescription}
        >
            <PageTitle title={name}>
                {description && <p className={styles.description}>{description}</p>}
                <div className={styles.links}>
                    {uploadcare_group_uuid && (
                        <DownloadLink href={getUploadcareGroupUrl(uploadcare_group_uuid, name)} />
                    )}
                    <StoryLinks
                        url={url}
                        title={gallery.name}
                        className={styles.shareLinks}
                        buttonClassName={styles.shareButton}
                        iconClassName={styles.shareIcon}
                        hideScrollToTop
                    />
                </div>
            </PageTitle>
            <ContentRenderer nodes={JSON.parse(content)} />
        </Layout>
    );
}

function useGalleryPageMetaDescription(gallery: NewsroomGallery) {
    const { formatMessage } = useIntl();
    const description = gallery.description?.trim() ?? '';

    if (gallery.type === NewsroomGallery.Type.IMAGE) {
        const imagesCount = formatMessage(translations.mediaGallery.imagesCount, {
            imagesCount: gallery.images_number,
        });

        return [imagesCount, description].filter(Boolean).join(' - ');
    }

    if (gallery.type === NewsroomGallery.Type.VIDEO) {
        const videosCount = formatMessage(translations.mediaGallery.videosCount, {
            videosCount: gallery.videos_number,
        });
        return [videosCount, description].filter(Boolean).join(' - ');
    }

    return description;
}
