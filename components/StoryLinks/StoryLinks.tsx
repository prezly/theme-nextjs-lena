import { Button, ScrollToTopButton, SocialShareButton } from '@prezly/themes-ui-components';
import classNames from 'classnames';

import { useDevice } from '@/hooks/useDevice';
import { IconArrowTop, IconFacebook, IconLinkedin, IconTwitter } from 'icons';

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
    const { isMobile } = useDevice();

    return (
        <div className={classNames(styles.container, className)}>
            {!isMobile && !hideScrollToTop && (
                <ScrollToTopButton
                    className={styles.scrollToTop}
                    icon={IconArrowTop}
                    iconClassName={styles.scrollTopIcon}
                />
            )}
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <SocialShareButton network="facebook" url={url}>
                    <IconFacebook className={classNames(styles.icon, iconClassName)} />
                </SocialShareButton>
            </Button>
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <SocialShareButton network="twitter" url={url}>
                    <IconTwitter className={classNames(styles.icon, iconClassName)} />
                </SocialShareButton>
            </Button>
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <SocialShareButton network="linkedin" url={url}>
                    <IconLinkedin className={classNames(styles.icon, iconClassName)} />
                </SocialShareButton>
            </Button>
            <StoryShareUrl url={url} buttonClassName={buttonClassName} />
        </div>
    );
}

export default StoryLinks;
