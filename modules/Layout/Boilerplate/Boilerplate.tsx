import { useCompanyInformation, useNewsroom } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { SocialMedia } from '@/components';
import { IconBuilding, IconEmail, IconGlobe, IconPhone } from '@/icons';

import {
    getWebsiteHostname,
    hasAnyAboutInformation,
    hasAnyContactInformation,
    hasAnySocialMedia,
} from './utils';

import styles from './Boilerplate.module.scss';

function Boilerplate() {
    const companyInformation = useCompanyInformation();
    const { display_name } = useNewsroom();

    const hasAboutInformation = hasAnyAboutInformation(companyInformation);
    const hasSocialMedia = hasAnySocialMedia(companyInformation);
    const hasContactInformation = hasAnyContactInformation(companyInformation);
    const hasAddress = Boolean(companyInformation.address);
    const hasPhone = Boolean(companyInformation.phone);
    const hasEmail = Boolean(companyInformation.email);

    if (!hasAboutInformation && !hasContactInformation && !hasAnySocialMedia) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <div className={styles.columns}>
                    {hasAboutInformation && (
                        <div className={styles.aboutUs}>
                            <h2 className={styles.heading}>
                                <FormattedMessage
                                    {...translations.boilerplate.title}
                                    values={{
                                        companyName: companyInformation.name || display_name,
                                    }}
                                />
                            </h2>
                            {companyInformation.about && (
                                <div
                                    className={styles.about}
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{ __html: companyInformation.about }}
                                />
                            )}
                        </div>
                    )}
                    {(hasContactInformation || hasSocialMedia) && (
                        <div className={styles.contacts}>
                            <h2 className={styles.heading}>
                                <FormattedMessage {...translations.boilerplate.contact} />
                            </h2>
                            {hasAddress && (
                                <div className={styles.linkWrapper}>
                                    <IconBuilding width={14} height={14} className={styles.icon} />
                                    <p>{companyInformation.address}</p>
                                </div>
                            )}
                            {hasPhone && (
                                <div className={styles.linkWrapper}>
                                    <IconPhone width={14} height={14} className={styles.icon} />
                                    <p>
                                        <a
                                            className={styles.link}
                                            href={`tel:${companyInformation.phone}`}
                                        >
                                            {companyInformation.phone}
                                        </a>
                                    </p>
                                </div>
                            )}
                            {hasEmail && (
                                <div className={styles.linkWrapper}>
                                    <IconEmail width={14} height={14} className={styles.icon} />
                                    <p>
                                        <a
                                            className={styles.link}
                                            href={`mailto:${companyInformation.email}`}
                                        >
                                            {companyInformation.email}
                                        </a>
                                    </p>
                                </div>
                            )}
                            {companyInformation.website && (
                                <div className={styles.linkWrapper}>
                                    <IconGlobe width={14} height={14} className={styles.icon} />
                                    <p>
                                        <a
                                            href={companyInformation.website}
                                            className={styles.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {getWebsiteHostname(companyInformation.website)}
                                        </a>
                                    </p>
                                </div>
                            )}
                            {hasSocialMedia && (
                                <SocialMedia
                                    companyInformation={companyInformation}
                                    className={styles.socialMedia}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Boilerplate;
