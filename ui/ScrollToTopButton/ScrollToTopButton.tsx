import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { IconArrowTop } from '@/icons';

import { Button } from '../Button';

import styles from './ScrollToTopButton.module.scss';

const SCROLL_TOP_MIN_HEIGHT = 300;

interface Props {
    className?: string;
    ariaLabel?: string;
}

export function ScrollToTopButton({ className, ariaLabel = 'Scroll to top' }: Props) {
    const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

    useEffect(() => {
        function scrollListener() {
            setIsScrollToTopVisible(
                document.body.scrollTop > SCROLL_TOP_MIN_HEIGHT ||
                    document.documentElement.scrollTop > SCROLL_TOP_MIN_HEIGHT,
            );
        }
        if (typeof window !== 'undefined') {
            window.onscroll = scrollListener;
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.onscroll = null;
            }
        };
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <Button
            variation="secondary"
            className={classNames(
                styles.button,
                { [styles.visible]: isScrollToTopVisible },
                className,
            )}
            aria-label={ariaLabel}
            onClick={scrollToTop}
        >
            <IconArrowTop width={16} height={16} className={styles.icon} />
        </Button>
    );
}
