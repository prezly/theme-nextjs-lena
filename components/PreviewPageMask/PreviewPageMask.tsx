import { useMaskParam } from '@/hooks/useMaskParam';

import styles from './PreviewPageMask.module.scss';

export function PreviewPageMask() {
    const mask = useMaskParam();

    if (!mask) {
        return null;
    }

    return <div className={styles.mask} />;
}
