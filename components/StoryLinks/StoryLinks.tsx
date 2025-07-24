import classNames from 'classnames';

import { useDevice } from '@/hooks/useDevice';
import { IconFacebook, IconLinkedin, IconTwitter } from '@/icons';
import { ScrollToTopButton } from '@/ui';
import { SocialNetwork } from 'types';

import { SocialShareButton } from '../SocialMedia';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryLinks.module.scss';

interface Props {
    url: string;
    title: string;
    summary?: string;
    className?: string;
    buttonClassName?: string;
    iconClassName?: string;
    hideScrollToTop?: boolean;
}

function StoryLinks({
    url,
    title,
    summary,
    buttonClassName,
    hideScrollToTop,
    className,
    iconClassName,
}: Props) {
    const { isTablet } = useDevice();

    return (
        <div className={classNames(styles.container, className)}>
            {!isTablet && !hideScrollToTop && <ScrollToTopButton className={styles.scrollToTop} />}
            <SocialShareButton
                className={classNames(styles.button, buttonClassName)}
                network={SocialNetwork.FACEBOOK}
                summary={summary}
                title={title}
                url={url}
            >
                <IconFacebook
                    width={16}
                    height={16}
                    className={classNames(styles.icon, iconClassName)}
                />
            </SocialShareButton>
            <SocialShareButton
                className={classNames(styles.button, buttonClassName)}
                network={SocialNetwork.TWITTER}
                summary={summary}
                title={title}
                url={url}
            >
                <IconTwitter
                    width={16}
                    height={16}
                    className={classNames(styles.icon, iconClassName)}
                />
            </SocialShareButton>
            <SocialShareButton
                className={classNames(styles.button, buttonClassName)}
                network={SocialNetwork.LINKEDIN}
                summary={summary}
                title={title}
                url={url}
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
