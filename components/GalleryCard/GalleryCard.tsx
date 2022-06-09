import type { NewsroomGallery } from '@prezly/sdk';
import { getUploadcareGroupUrl, useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import UploadcareImage from '@prezly/uploadcare-image';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { IconArrowDown } from 'icons';

import Button from '../Button';

import styles from './GalleryCard.module.scss';

interface Props {
    className?: string;
    gallery: NewsroomGallery;
}

function GalleryCard({ className, gallery }: Props) {
    const { title, images, uuid, uploadcare_group_uuid } = gallery;
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link href={`/media/album/${uuid}`} locale={getLinkLocaleSlug()} passHref>
            <a className={classNames(styles.container, className)}>
                <UploadcareImage
                    className={styles.thumbnail}
                    lazy
                    layout="fill"
                    objectFit="cover"
                    imageDetails={images[0].uploadcare_image}
                />
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    {uploadcare_group_uuid && (
                        <Button.Link
                            variation="secondary"
                            href={getUploadcareGroupUrl(uploadcare_group_uuid, title)}
                            className={styles.button}
                            icon={IconArrowDown}
                            iconPlacement="right"
                        >
                            <FormattedMessage {...translations.actions.download} />
                        </Button.Link>
                    )}
                </div>
            </a>
        </Link>
    );
}

export default GalleryCard;
