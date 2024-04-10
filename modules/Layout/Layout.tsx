import { Analytics, useAnalytics } from '@prezly/analytics-nextjs';
import { Notification, Story } from '@prezly/sdk';
import {
    PageSeo,
    useCurrentStory,
    useNewsroom,
    useNewsroomContext,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Router, useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { CategoriesBar, NotificationsBar } from '@/components';
import { LoadingBar, ScrollToTopButton } from '@/ui';

import Boilerplate from './Boilerplate';
import Branding from './Branding';
import Contacts from './Contacts';
import Footer from './Footer';
import Header from './Header';
import SubscribeForm from './SubscribeForm';

import styles from './Layout.module.scss';

interface Props {
    description?: string;
    imageUrl?: string;
    title?: string;
    hasError?: boolean;
}

const CookieConsentBar = dynamic(() => import('./CookieConsentBar'), {
    ssr: false,
});

const PATHS_WITH_CUSTOM_BG = ['/', '/[slug]', '/s/[slug]', '/media', '/media/album/[uuid]'];
const STORY_PAGE_PATHS = ['/[slug]', '/s/[slug]'];
const noIndex = process.env.VERCEL === '1';

function Layout({ children, description, imageUrl, title, hasError }: PropsWithChildren<Props>) {
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const { page } = useAnalytics();
    const newsroom = useNewsroom();
    const story = useCurrentStory();
    const { contacts, notifications } = useNewsroomContext();
    const { query, pathname } = useRouter();

    const isSecretUrl = pathname.startsWith('/s/');
    const isPreviewFlag = Object.keys(query).includes('preview');
    const isConfidentialStory = story && story.visibility === Story.Visibility.CONFIDENTIAL;

    const isPreview = isSecretUrl && (isPreviewFlag || !isConfidentialStory);

    const displayedNotifications = useMemo((): Notification[] => {
        if (isPreview) {
            return [
                ...notifications,
                {
                    id: 'preview-warning',
                    type: 'preview-warning',
                    style: Notification.Style.WARNING,
                    title: 'This is a preview with a temporary URL which will change after publishing.',
                    description: '',
                    actions: [],
                },
            ];
        }

        return notifications;
    }, [notifications, isPreview]);

    useEffect(() => {
        page();
    }, [page, pathname]);

    useEffect(() => {
        function onRouteChangeStart() {
            setIsLoadingPage(true);
        }

        function routeChangeComplete() {
            setIsLoadingPage(false);
        }

        Router.events.on('routeChangeStart', onRouteChangeStart);
        Router.events.on('routeChangeComplete', routeChangeComplete);
        return () => {
            Router.events.off('routeChangeStart', onRouteChangeStart);
            Router.events.off('routeChangeComplete', routeChangeComplete);
        };
    }, []);

    return (
        <>
            <Analytics />
            <Branding newsroom={newsroom} />
            <PageSeo
                title={title}
                description={description}
                imageUrl={imageUrl}
                noindex={noIndex}
                nofollow={noIndex}
            />
            <NotificationsBar notifications={displayedNotifications} />
            <CookieConsentBar />
            <div
                className={classNames(styles.layout, {
                    [styles.customBg]: PATHS_WITH_CUSTOM_BG.includes(pathname),
                })}
            >
                <Header hasError={hasError} />
                <CategoriesBar />
                <main className={styles.content}>
                    {children}
                    <LoadingBar isLoading={isLoadingPage} />
                </main>
                {contacts && <Contacts contacts={contacts} />}
                <SubscribeForm />
                <Boilerplate />
                <Footer />
            </div>
            {/* hide scroll to top on story page */}
            {!STORY_PAGE_PATHS.includes(pathname) && <ScrollToTopButton />}
        </>
    );
}

export default Layout;
