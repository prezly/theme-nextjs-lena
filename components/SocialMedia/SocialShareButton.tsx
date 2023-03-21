import type { PropsWithChildren } from 'react';

import { Button } from '@/ui';

import type { ShareableSocialNetwork } from './types';
import { getSocialShareUrl } from './utils';

interface ShareButtonProps {
    network: ShareableSocialNetwork;
    url: string;
    className?: string;
}

export function SocialShareButton({
    network,
    url,
    className,
    children,
}: PropsWithChildren<ShareButtonProps>) {
    const shareUrl = getSocialShareUrl(network, url);

    if (!shareUrl) {
        return null;
    }

    function handleClick() {
        window.open(shareUrl, '_blank');
    }

    return (
        <Button
            onClick={handleClick}
            aria-label={network}
            className={className}
            variation="secondary"
        >
            {children}
        </Button>
    );
}
