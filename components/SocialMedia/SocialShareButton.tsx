import { translations } from '@prezly/theme-kit-intl';
import type { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import { ButtonLink } from '@/ui';
import type { SocialNetwork } from 'types';

import { getSocialShareUrl } from './utils';

interface ShareButtonProps {
    className?: string;
    network: SocialNetwork;
    summary: string | null;
    title: string;
    url: string;
}

export function SocialShareButton({
    children,
    className,
    network,
    summary,
    title,
    url,
}: PropsWithChildren<ShareButtonProps>) {
    const { formatMessage } = useIntl();
    const shareUrl = getSocialShareUrl(network, { url, title, summary });

    function capitalize(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function generateAriaLabel(socialNetwork: SocialNetwork) {
        return [formatMessage(translations.actions.share), capitalize(socialNetwork)].join(' ');
    }

    if (!shareUrl) {
        return null;
    }

    return (
        <ButtonLink
            aria-label={generateAriaLabel(network)}
            className={className}
            href={shareUrl}
            rel="noopener noreferrer"
            target="_blank"
            variation="secondary"
        >
            {children}
        </ButtonLink>
    );
}
