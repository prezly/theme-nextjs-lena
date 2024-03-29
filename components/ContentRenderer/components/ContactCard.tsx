import type { ContactNode } from '@prezly/story-content-format';

import BaseContactCard from '../../ContactCard';

import styles from './ContactCard.module.scss';

interface Props {
    node: ContactNode;
}

export function ContactCard({ node }: Props) {
    return (
        <BaseContactCard
            className={styles.contactCard}
            contactInfo={node.contact}
            layout={node.layout}
            renderAvatar={({ className }) =>
                node.contact.avatar_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className={className}
                        src={node.contact.avatar_url}
                        alt={node.contact.name}
                    />
                )
            }
            showAvatar={node.show_avatar}
            uuid={node.uuid}
        />
    );
}
