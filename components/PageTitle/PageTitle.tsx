import classNames from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';

import styles from './PageTitle.module.scss';

interface Props {
    title: string;
    subtitle?: ReactNode;
    className?: string;
}

function PageTitle({ title, subtitle, className, children }: PropsWithChildren<Props>) {
    return (
        <div className={styles.background}>
            <div className={classNames(styles.container, className)}>
                <h1 className={styles.title}>{title}</h1>
                {children}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
        </div>
    );
}

export default PageTitle;
