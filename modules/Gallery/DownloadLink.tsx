import { translations } from '@prezly/theme-kit-intl';
import { FormattedMessage } from 'react-intl';

import { IconArrowDown } from '@/icons';

import styles from './DownloadLink.module.scss';

interface Props {
    href: string;
}

function DownloadLink({ href }: Props) {
    return (
        <a href={href} className={styles.link}>
            <FormattedMessage {...translations.actions.download} />
            <IconArrowDown width={16} height={16} className={styles.icon} />
        </a>
    );
}

export default DownloadLink;
