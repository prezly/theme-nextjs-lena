import classNames from 'classnames';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import { useDevice } from '@/hooks/useDevice';
import { IconFacebook, IconLinkedin, IconTwitter } from 'icons';

import Button from '../Button';
import ScrollToTopButton from '../ScrollToTopButton';

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
            {!isMobile && !hideScrollToTop && <ScrollToTopButton className={styles.scrollToTop} />}
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <FacebookShareButton url={url}>
                    <IconFacebook className={classNames(styles.icon, iconClassName)} />
                </FacebookShareButton>
            </Button>
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <TwitterShareButton url={url}>
                    <IconTwitter className={classNames(styles.icon, iconClassName)} />
                </TwitterShareButton>
            </Button>
            <Button variation="secondary" className={classNames(styles.button, buttonClassName)}>
                <LinkedinShareButton url={url}>
                    <IconLinkedin className={classNames(styles.icon, iconClassName)} />
                </LinkedinShareButton>
            </Button>
            <StoryShareUrl url={url} buttonClassName={buttonClassName} />
        </div>
    );
}

export default StoryLinks;
