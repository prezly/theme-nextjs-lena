'use client';

import { useTransparencyBackdrop } from '@prezly/content-renderer-react-js';
import type { UploadedImage } from '@prezly/uploadcare';
import { uploadcareLoader } from '@uploadcare/nextjs-loader';
import classNames from 'classnames';
import Image, { type ImageProps } from 'next/image';
import { useMemo, useRef } from 'react';

import { getUploadcareImage } from '../../utils/getUploadcareImage';

interface Props extends Omit<ImageProps, 'src' | 'loader' | 'ref'> {
    cover: UploadedImage | null;
}

export function GalleryCardThumbnail({ cover, className, ...props }: Props) {
    const imageRef = useRef<HTMLImageElement>(null);
    const image = useMemo(() => getUploadcareImage(cover), [cover]);
    const hasTransparencyBackdrop = useTransparencyBackdrop(image, imageRef);

    if (!image) {
        return null;
    }

    return (
        <Image
            {...props}
            ref={imageRef}
            loader={uploadcareLoader}
            src={image.cdnUrl}
            className={classNames(className, {
                'prezly-slate-media--transparency-backdrop': hasTransparencyBackdrop,
            })}
        />
    );
}
