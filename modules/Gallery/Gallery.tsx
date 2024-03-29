import type { NewsroomGallery } from '@prezly/sdk';
import { getAssetsUrl, getGalleryThumbnail, getUploadcareGroupUrl } from '@prezly/theme-kit-core';
import { useEffect, useState } from 'react';

import { ContentRenderer, PageTitle, StoryLinks } from '@/components';

import Layout from '../Layout';

import DownloadLink from './DownloadLink';

import styles from './Gallery.module.scss';

interface Props {
    gallery: NewsroomGallery;
}

function Gallery({ gallery }: Props) {
    const { content, name, uploadcare_group_uuid, description } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== undefined) {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <Layout
            title={name}
            imageUrl={galleryThumbnail ? getAssetsUrl(galleryThumbnail.uuid) : undefined}
        >
            <PageTitle title={name}>
                {description && <p className={styles.description}>{description}</p>}
                <div className={styles.links}>
                    {uploadcare_group_uuid && (
                        <DownloadLink href={getUploadcareGroupUrl(uploadcare_group_uuid, name)} />
                    )}
                    <StoryLinks
                        url={url}
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

export default Gallery;
