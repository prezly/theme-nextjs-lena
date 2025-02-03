import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import { IconEmail, IconFacebook, IconGlobe, IconMobile, IconPhone, IconTwitter } from '@/icons';

import type { ContactInfo } from './types';
import { getSocialHandles, getUrl } from './utils';

import styles from './ContactCard.module.scss';

interface Props {
    className?: string;
    contactInfo: ContactInfo;
    layout: `${ContactNode.Layout}`;
    renderAvatar: ({ className }: { className: string }) => ReactNode;
    showAvatar: boolean;
    uuid: ContactNode['uuid'];
}

function ContactCard({ className, contactInfo, layout, renderAvatar, showAvatar, uuid }: Props) {
    const { name, description, company, email, phone, mobile } = contactInfo;
    const website = getUrl(contactInfo.website);
    const { facebook, twitter } = getSocialHandles(contactInfo);
    const subtitle = description && company ? `${description}, ${company}` : description || company;

    const isCard = layout === 'card';
    const isSignature = layout === 'signature';

    return (
        <div
            id={`contact-${uuid}`}
            className={classNames(styles.container, className, {
                [styles.card]: isCard,
                [styles.signature]: isSignature,
            })}
        >
            <div className={styles.content}>
                {showAvatar && renderAvatar({ className: styles.avatar })}
                <div className={styles.meta}>
                    <h4 className={styles.name}>{name}</h4>
                    {subtitle && <h5 className={styles.position}>{subtitle}</h5>}
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.links}>
                {isCard && (
                    <div className={styles.linkGroup}>
                        {email && (
                            <a href={`mailto:${email}`} className={styles.link}>
                                <IconEmail className={styles.icon} />
                                <span className={styles.linkText}>{email}</span>
                            </a>
                        )}
                        {phone && (
                            <a href={`tel:${phone}`} className={styles.link}>
                                <IconPhone width={16} height={16} className={styles.icon} />
                                <span className={styles.linkText}>{phone}</span>
                            </a>
                        )}
                        {mobile && (
                            <a href={`tel:${mobile}`} className={styles.link}>
                                <IconMobile width={16} height={16} className={styles.icon} />
                                <span className={styles.linkText}>{mobile}</span>
                            </a>
                        )}
                    </div>
                )}
                {isSignature && (
                    <div className={styles.linkGroup}>
                        {email && (
                            <a href={`mailto:${email}`} className={styles.link}>
                                <span className={styles.linkText}>E. {email}</span>
                            </a>
                        )}
                        {phone && (
                            <a href={`tel:${phone}`} className={styles.link}>
                                <span className={styles.linkText}>P. {phone}</span>
                            </a>
                        )}
                        {mobile && (
                            <a href={`tel:${mobile}`} className={styles.link}>
                                <span className={styles.linkText}>M. {mobile}</span>
                            </a>
                        )}
                        {website && (
                            <a href={website.toString()} className={styles.link}>
                                <span className={styles.linkText}>W. {website.hostname}</span>
                            </a>
                        )}
                    </div>
                )}
                <div className={classNames(styles.linkGroup, styles.social)}>
                    {website && isCard && (
                        <a href={website.toString()} className={styles.link} title="Website">
                            <IconGlobe width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>
                                {website.toString().replace(/(^\w+:|^)\/\//, '')}
                            </span>
                        </a>
                    )}
                    {facebook && (
                        <a
                            href={`https://facebook.com/${facebook}`}
                            className={classNames(styles.link)}
                            title="Facebook"
                        >
                            <IconFacebook width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{facebook}</span>
                        </a>
                    )}
                    {twitter && (
                        <a
                            href={`https://twitter.com/${twitter}`}
                            className={classNames(styles.link)}
                            title="Twitter"
                        >
                            <IconTwitter width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{`@${twitter}`}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
