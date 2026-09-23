import { SocialLinks } from 'social-links';

import type { ContactInfo } from './types';

export function getSocialHandles(contactInfo: ContactInfo) {
    // Allow query params in social links in case someone decides to use UTM codes
    const socialLinks = new SocialLinks({ allowQueryParams: true });
    const facebook = contactInfo.facebook || '';
    const twitter = contactInfo.twitter || '';
    const linkedin = contactInfo.linkedin || '';
    const instagram = contactInfo.instagram || '';

    // We have to check whether the social links are valid first
    // otherwise `getProfileId` method throws an error
    const isValidFacebook = socialLinks.isValid('facebook', facebook);
    const isValidTwitter = socialLinks.isValid('twitter', twitter);
    const isValidLinkedin = socialLinks.isValid('linkedin', linkedin);
    const isValidInstagram = socialLinks.isValid('instagram', instagram);

    return {
        facebook: isValidFacebook ? socialLinks.getProfileId('facebook', facebook) : null,
        twitter: isValidTwitter ? socialLinks.getProfileId('twitter', twitter) : null,
        linkedin: isValidLinkedin ? socialLinks.getProfileId('linkedin', linkedin) : null,
        linkedinUrl: isValidLinkedin ? socialLinks.sanitize('linkedin', linkedin) : null,
        instagram: isValidInstagram ? socialLinks.getProfileId('instagram', instagram) : null,
    };
}

export function getUrl(url: string): URL | null {
    try {
        return new URL(url);
    } catch (error) {
        return null;
    }
}
