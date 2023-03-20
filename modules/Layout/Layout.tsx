import { Analytics, useAnalyticsContext } from '@prezly/analytics-nextjs';
import { PageSeo, useNewsroom, useNewsroomContext } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Router, useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

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

function Layout({ children, description, imageUrl, title, hasError }: PropsWithChildren<Props>) {
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const newsroom = useNewsroom();
    const { contacts, notifications } = useNewsroomContext();
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();
    const router = useRouter();
    const path = router.pathname;
    const pathsWithCustomBg = ['/', '/[slug]', '/s/[slug]', '/media', '/media/album/[uuid]'];

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
            <NotificationsBar notifications={notifications} />
            <CookieConsentBar />
            <div
                className={classNames(styles.layout, {
                    [styles.customBg]: pathsWithCustomBg.includes(path),
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
            {path !== '/[slug]' && path !== '/s/[slug]' && <ScrollToTopButton />}
        </>
    );
}

export default Layout;
