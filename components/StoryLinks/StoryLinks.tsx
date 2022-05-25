import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import { useDevice } from '@/hooks/useDevice';
import { IconFacebook, IconLinkedin, IconTwitter } from 'icons';

import Button from '../Button';
import ScrollToTopButton from '../ScrollToTopButton';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryLinks.module.scss';

interface Props {
    url: string;
}

function StoryLinks({ url }: Props) {
    const { isMobile } = useDevice();

    return (
        <div className={styles.container}>
            {!isMobile && <ScrollToTopButton className={styles.scrollToTop} />}
            <Button variation="secondary" className={styles.button}>
                <FacebookShareButton url={url}>
                    <IconFacebook className={styles.icon} />
                </FacebookShareButton>
            </Button>
            <Button variation="secondary" className={styles.button}>
                <TwitterShareButton className={styles.button} url={url}>
                    <IconTwitter className={styles.icon} />
                </TwitterShareButton>
            </Button>
            <Button variation="secondary" className={styles.button}>
                <LinkedinShareButton className={styles.button} url={url}>
                    <IconLinkedin className={styles.icon} />
                </LinkedinShareButton>
            </Button>
            <StoryShareUrl url={url} />
        </div>
    );
}

export default StoryLinks;
