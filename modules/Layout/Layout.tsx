import { Analytics, useAnalyticsContext } from '@prezly/analytics-nextjs';
import type { Notification } from '@prezly/sdk';
import { PageSeo, useNewsroom, useNewsroomContext } from '@prezly/theme-kit-nextjs';
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

function Layout({ children, description, imageUrl, title, hasError }: PropsWithChildren<Props>) {
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const newsroom = useNewsroom();
    const { contacts, notifications } = useNewsroomContext();
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();
    const { pathname } = useRouter();

    const displayedNotifications = useMemo(() => {
        if (pathname === '/s/[uuid]') {
            return [
                ...notifications,
                {
                    id: 'preview-warning',
                    type: 'preview-warning',
                    style: 'warning',
                    title: 'This is a preview with a temporary URL which will change after publishing.',
                    description: '',
                    actions: [],
                } as Notification,
            ];
        }

        return notifications;
    }, [notifications, pathname]);

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
                noindex={!isAnalyticsEnabled}
                nofollow={!isAnalyticsEnabled}
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
