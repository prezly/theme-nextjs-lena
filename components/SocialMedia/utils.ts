import type { NewsroomCompanyInformation } from '@prezly/sdk';

import { createUrlWithQuery } from '@/utils';
import { SocialNetwork } from 'types';

function prependAtToUsername(username: string): string {
    if (username.startsWith('@')) {
        return username;
    }

    return `@${username}`;
}

function getSocialLink(socialNetwork: SocialNetwork, url: string | null): string | null {
    if (!url || url.startsWith('http') || url.startsWith('www')) {
        return url;
    }

    switch (socialNetwork) {
        case 'facebook':
            return `https://facebook.com/${url}`;
        case 'instagram':
            return `https://instagram.com/${url}/`;
        case 'linkedin':
            return `https://linkedin.com/in/${url}`;
        case 'pinterest':
            return `https://pinterest.com/${url}`;
        case 'tiktok':
            return `https://tiktok.com/${prependAtToUsername(url)}`;
        case 'twitter':
            return `https://twitter.com/${url}`;
        case 'youtube':
            return `https://youtube.com/${url}`;
        default:
            return null;
    }
}

export function getSocialLinks(companyInformation: NewsroomCompanyInformation) {
    const { facebook, instagram, linkedin, pinterest, tiktok, twitter, youtube } =
        companyInformation;

    return {
        facebook: getSocialLink(SocialNetwork.FACEBOOK, facebook),
        instagram: getSocialLink(SocialNetwork.INSTAGRAM, instagram),
        linkedin: getSocialLink(SocialNetwork.LINKEDIN, linkedin),
        pinterest: getSocialLink(SocialNetwork.PINTEREST, pinterest),
        tiktok: getSocialLink(SocialNetwork.TIKTOK, tiktok),
        twitter: getSocialLink(SocialNetwork.TWITTER, twitter),
        youtube: getSocialLink(SocialNetwork.YOUTUBE, youtube),
    };
}

export function getSocialShareUrl(
    network: SocialNetwork,
    parameters: { url: string; title: string; summary?: string },
): string | undefined {
    const { url, title, summary } = parameters;

    switch (network) {
        case 'facebook':
            return createUrlWithQuery('https://www.facebook.com/sharer/sharer.php', {
                u: url,
            });
        case 'linkedin':
            return createUrlWithQuery('https://www.linkedin.com/sharing/share-offsite', {
                url,
                text: [title, summary, url].filter(Boolean).join('\n\n'),
            });
        case 'twitter':
            return createUrlWithQuery('https://twitter.com/intent/tweet', {
                url,
                text: title,
            });
        default:
            return undefined;
    }
}
