// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@playwright/test';

import type { ContactInfo } from '../components/ContactCard/types';
import { getSocialHandles } from '../components/ContactCard/utils';

const contact: ContactInfo = {
    name: 'Press contact',
    description: '',
    company: '',
    email: '',
    phone: '',
    mobile: '',
    website: '',
    facebook: '',
    twitter: '',
};

const profiles = [
    ['prezly', 'https://linkedin.com/in/prezly'],
    ['https://www.linkedin.com/in/prezly', 'https://linkedin.com/in/prezly'],
    ['http://linkedin.com/in/prezly/', 'https://linkedin.com/in/prezly'],
    ['linkedin.com/in/prezly', 'https://linkedin.com/in/prezly'],
    ['https://de.linkedin.com/in/prezly', 'https://linkedin.com/in/prezly'],
    [' https://www.linkedin.com/in/prezly/ ', 'https://linkedin.com/in/prezly'],
    ['https://linkedin.com/in/prezly?utm_source=site', 'https://linkedin.com/in/prezly'],
    ['https://linkedin.com/mwlite/in/prezly', 'https://linkedin.com/mwlite/in/prezly'],
];

profiles.forEach(([input, url]) => {
    test(`sanitizes LinkedIn ${JSON.stringify(input)} separately from its label`, () => {
        const result = getSocialHandles({ ...contact, linkedin: input });

        expect(result.linkedin).toBe('prezly');
        expect(result.linkedinUrl).toBe(url);
    });
});

[
    undefined,
    null,
    '',
    'not a profile',
    // eslint-disable-next-line no-script-url -- Verify unsafe profile input is rejected.
    'javascript:alert(1)',
    'https://example.com/in/prezly',
    'https://www.linkedin.com/company/prezly',
    'https://www.linkedin.com/school/prezly',
    'https://www.linkedin.com/pub/prezly/1/2/3',
].forEach((input) => {
    test(`omits missing or unsupported LinkedIn ${JSON.stringify(input)}`, () => {
        const result = getSocialHandles({ ...contact, linkedin: input });

        expect(result.linkedin).toBeNull();
        expect(result.linkedinUrl).toBeNull();
    });
});

test('keeps Facebook, X and Instagram handles alongside LinkedIn', () => {
    expect(
        getSocialHandles({
            ...contact,
            facebook: 'https://facebook.com/prezly',
            twitter: 'https://twitter.com/prezly',
            instagram: 'https://instagram.com/prezly',
            linkedin: 'https://linkedin.com/in/prezly',
        }),
    ).toEqual({
        facebook: 'prezly',
        twitter: 'prezly',
        instagram: 'prezly',
        linkedin: 'prezly',
        linkedinUrl: 'https://linkedin.com/in/prezly',
    });
});

[
    undefined,
    null,
    '',
    'not a profile',
    // eslint-disable-next-line no-script-url -- Verify unsafe profile input is rejected.
    'javascript:alert(1)',
].forEach((input) => {
    test(`omits missing or invalid Instagram ${JSON.stringify(input)}`, () => {
        expect(getSocialHandles({ ...contact, instagram: input }).instagram).toBeNull();
    });
});
