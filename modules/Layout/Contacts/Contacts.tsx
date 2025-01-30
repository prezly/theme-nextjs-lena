import type { NewsroomContact } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-intl';
import { useCurrentLocale } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';
import classNames from 'classnames';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ContactCard } from '@/components';
import { getUploadcareImage } from '@/utils';

import { getNumberOfColumns } from './lib';

import styles from './Contacts.module.scss';

interface Props {
    contacts: NewsroomContact[];
}

function Contacts({ contacts }: Props) {
    const currentLocale = useCurrentLocale();
    const contactsInCurrentLocale = useMemo(
        () =>
            contacts.filter((contact) => {
                const localeCodes = contact.display_locales.map((locale) => locale.code);
                return localeCodes.includes(currentLocale.toUnderscoreCode());
            }),
        [contacts, currentLocale],
    );

    const numberOfColumns = getNumberOfColumns(contactsInCurrentLocale.length);

    if (contactsInCurrentLocale.length === 0) {
        return null;
    }

    return (
        <div id='contacts' className={styles.contacts}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    <FormattedMessage {...translations.contacts.title} />
                </h2>
                <div
                    className={classNames(styles.grid, {
                        [styles.twoColumns]: numberOfColumns === 2,
                        [styles.threeColumns]: numberOfColumns === 3,
                    })}
                >
                    {contactsInCurrentLocale.map((contact) => (
                        <ContactCard
                            key={contact.uuid}
                            contactInfo={{
                                name: contact.name ?? '',
                                company: contact.company ?? '',
                                description: contact.description ?? '',
                                email: contact.email ?? '',
                                website: contact.website ?? '',
                                mobile: contact.mobile ?? '',
                                phone: contact.phone ?? '',
                                facebook: contact.facebook ?? '',
                                twitter: contact.twitter ?? '',
                            }}
                            layout="card"
                            renderAvatar={({ className }) => {
                                const image = getUploadcareImage(contact.avatar_image);

                                return (
                                    image && (
                                        <UploadcareImage
                                            className={className}
                                            src={image.cdnUrl}
                                            width={64}
                                            height={64}
                                            alt={contact.name}
                                        />
                                    )
                                );
                            }}
                            showAvatar
                            uuid={contact.uuid}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contacts;
