import type { NewsroomGallery } from '@prezly/sdk';
import { getUploadcareGroupUrl } from '@prezly/theme-kit-core';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import UploadcareImage from '@prezly/uploadcare-image';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { IconArrowDown } from '@/icons';
import { ButtonLink } from '@/ui';

import styles from './GalleryCard.module.scss';

interface Props {
    className?: string;
    gallery: NewsroomGallery;
}

function GalleryCard({ className, gallery }: Props) {
    const { name, images, uuid, uploadcare_group_uuid } = gallery;
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <div className={classNames(styles.container, className)}>
            <Link href={`/media/album/${uuid}`} locale={getLinkLocaleSlug()}>
                <UploadcareImage
                    className={styles.thumbnail}
                    lazy
                    layout="fill"
                    objectFit="cover"
                    imageDetails={images[0].uploadcare_image}
                />
            </Link>
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
                    >
                        <FormattedMessage {...translations.actions.download} />
                    </ButtonLink>
                )}
            </div>
        </div>
    );
}

export default GalleryCard;
