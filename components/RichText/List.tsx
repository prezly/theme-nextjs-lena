import type { ListItemNode, ListItemTextNode } from '@prezly/story-content-format';
import { ListNode, TextAlignment } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    const Tag = node.type === ListNode.Type.NUMBERED ? 'ol' : 'ul';

    return (
        <div
            className={classNames(styles.listContainer, {
                [styles.alignLeft]: node.align === TextAlignment.LEFT,
                [styles.alignCenter]: node.align === TextAlignment.CENTER,
                [styles.alignRight]: node.align === TextAlignment.RIGHT,
                [styles.alignJustify]: node.align === TextAlignment.JUSTIFY,
            })}
        >
            <Tag
                className={classNames({
                    [styles.bulletedList]: node.type === ListNode.Type.BULLETED,
                    [styles.numberedList]: node.type === ListNode.Type.NUMBERED,
                })}
            >
                {children}
            </Tag>
        </div>
    );
}

interface ListItemProps {
    node: ListItemNode;
}

export function ListItem({ children }: PropsWithChildren<ListItemProps>) {
    return <li className={styles.listItem}>{children}</li>;
}

interface ListItemTextProps {
    node: ListItemTextNode;
}

export function ListItemText({ children }: PropsWithChildren<ListItemTextProps>) {
    return <>{children}</>;
}
