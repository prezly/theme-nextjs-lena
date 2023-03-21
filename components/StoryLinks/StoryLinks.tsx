import classNames from 'classnames';

import { useDevice } from '@/hooks/useDevice';
import { IconFacebook, IconLinkedin, IconTwitter } from '@/icons';
import { ScrollToTopButton } from '@/ui';

import { SocialShareButton } from '../SocialMedia';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryLinks.module.scss';

interface Props {
    url: string;
    className?: string;
    buttonClassName?: string;
    iconClassName?: string;
    hideScrollToTop?: boolean;
}

function StoryLinks({ url, buttonClassName, hideScrollToTop, className, iconClassName }: Props) {
    const { isTablet } = useDevice();

    return (
        <div className={classNames(styles.container, className)}>
            {!isTablet && !hideScrollToTop && <ScrollToTopButton className={styles.scrollToTop} />}
            <SocialShareButton
                network="facebook"
                url={url}
                className={classNames(styles.button, buttonClassName)}
            >
                <IconFacebook
                    width={16}
                    height={16}
                    className={classNames(styles.icon, iconClassName)}
                />
            </SocialShareButton>
            <SocialShareButton
                network="twitter"
                url={url}
                className={classNames(styles.button, buttonClassName)}
            >
                <IconTwitter
                    width={16}
                    height={16}
                    className={classNames(styles.icon, iconClassName)}
                />
            </SocialShareButton>
            <SocialShareButton
                network="linkedin"
                url={url}
                className={classNames(styles.button, buttonClassName)}
            >
                <IconLinkedin
                    width={16}
                    height={16}
                    className={classNames(styles.icon, iconClassName)}
                />
            </SocialShareButton>
            <StoryShareUrl url={url} buttonClassName={buttonClassName} />
        </div>
    );
}

export default StoryLinks;
