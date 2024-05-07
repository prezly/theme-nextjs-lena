import { DOWNLOAD, useAnalytics } from '@prezly/analytics-nextjs';
import type { NewsroomGallery } from '@prezly/sdk';
import { getGalleryThumbnail, getUploadcareGroupUrl } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { IconArrowDown } from '@/icons';
import { ButtonLink } from '@/ui';
import { getUploadcareFile } from '@/utils';

import styles from './GalleryCard.module.scss';

interface Props {
    className?: string;
    gallery: NewsroomGallery;
}

function GalleryCard({ className, gallery }: Props) {
    const { track } = useAnalytics();
    const { name, uuid, uploadcare_group_uuid } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const thumbnailImage = getUploadcareFile(galleryThumbnail);

    function handleDownloadClick() {
        track(DOWNLOAD.MEDIA_GALLERY);
    }

    return (
        <div className={classNames(styles.container, className)}>
            {thumbnailImage && (
                <Link
                    className={styles.thumbnailWrapper}
                    href={`/media/album/${uuid}`}
                    locale={getLinkLocaleSlug()}
                >
                    <UploadcareImage
                        alt={name}
                        className={styles.thumbnail}
                        src={thumbnailImage.cdnUrl}
                        width={540}
                        height={260}
                    />
                </Link>
            )}
            <div className={styles.content}>
                <Link
                    href={`/media/album/${uuid}`}
                    locale={getLinkLocaleSlug()}
                    className={styles.title}
                >
                    {name}
                </Link>
                {uploadcare_group_uuid && (
                    <ButtonLink
                        variation="secondary"
                        href={getUploadcareGroupUrl(uploadcare_group_uuid, name)}
                        className={styles.button}
                        icon={IconArrowDown}
                        iconPlacement="right"
                        onClick={handleDownloadClick}
                    >
                        <FormattedMessage {...translations.actions.download} />
                    </ButtonLink>
                )}
            </div>
        </div>
    );
}

export default GalleryCard;
