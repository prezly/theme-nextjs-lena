import { translations } from '@prezly/theme-kit-intl';
import {
    useCategories,
    useCompanyInformation,
    useGetLinkLocaleSlug,
    useNewsroom,
    useNewsroomContext,
    useSearchSettings,
    useCurrentLocale,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDevice, useThemeSettings } from '@/hooks';
import { IconClose, IconImage, IconMenu, IconSearch, IconEmail } from '@/icons';
import { Button, ButtonLink } from '@/ui';

import CategoriesDropdown from './CategoriesDropdown';
import LanguagesDropdown from './LanguagesDropdown';
import { Logo } from './Logo';

import styles from './Header.module.scss';

const SearchWidget = dynamic(() => import('./SearchWidget'), { ssr: false });

interface Props {
    hasError?: boolean;
}

function Header({ hasError }: Props) {
    const { newsroom_logo, display_name, public_galleries_number } = useNewsroom();
    const { contacts } = useNewsroomContext();
    const currentLocale = useCurrentLocale() as unknown as { localeCode: string };
    const { logoSize } = useThemeSettings();
    const categories = useCategories();
    const { name } = useCompanyInformation();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const { formatMessage } = useIntl();
    const searchSettings = useSearchSettings();
    const { isMobile } = useDevice();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchWidgetShown, setIsSearchWidgetShown] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    function alignMobileHeader() {
        if (!isMobile) {
            return;
        }

        const header = headerRef.current;
        const headerRect = header?.getBoundingClientRect();

        // If header is not on top of the screen (e.g. a cookie banner is shown or user has scrolled down a bit),
        // Align the header with the top of the screen
        if (headerRect && headerRect.top !== 0) {
            window.scrollBy({ top: headerRect.top });
        }
    }

    function toggleMenu() {
        alignMobileHeader();

        // Adding a timeout to update the state only after the scrolling is triggered.
        setTimeout(() => setIsMenuOpen((o) => !o));
    }
    function closeMenu() {
        return setIsMenuOpen(false);
    }

    function toggleSearchWidget(event: MouseEvent) {
        event.preventDefault();
        alignMobileHeader();

        // Adding a timeout to update the state only after the scrolling is triggered.
        setTimeout(() => setIsSearchWidgetShown((o) => !o));
    }
    function closeSearchWidget() {
        return setIsSearchWidgetShown(false);
    }

    // Add scroll lock to the body while mobile menu is open
    useEffect(() => {
        document.body.classList.toggle(styles.body, isMenuOpen);

        return () => {
            document.body.classList.remove(styles.body);
        };
    }, [isMenuOpen]);

    const newsroomName = name || display_name;

    return (
        <header
            ref={headerRef}
            className={classNames(styles.container, {
                [styles.open]: isMenuOpen,
            })}
        >
            <div className="container">
                <nav role="navigation" className={styles.header}>
                    <Link
                        href="/"
                        locale={getLinkLocaleSlug()}
                        className={classNames(styles.newsroom, {
                            [styles.withoutLogo]: !newsroom_logo,
                        })}
                    >
                        <h1
                            className={classNames(styles.title, {
                                [styles.hidden]: newsroom_logo,
                            })}
                        >
                            {newsroomName}
                        </h1>
                        <Logo image={newsroom_logo} size={logoSize} />
                    </Link>

                    <div className={styles.navigationWrapper}>
                        <Button
                            variation="navigation"
                            icon={isMenuOpen ? IconClose : IconMenu}
                            className={classNames(styles.navigationToggle, {
                                [styles.hidden]: isSearchWidgetShown,
                            })}
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="menu"
                            title={formatMessage(translations.misc.toggleMobileNavigation)}
                            aria-label={formatMessage(translations.misc.toggleMobileNavigation)}
                        />

                        {searchSettings && (
                            <ButtonLink
                                href="/search"
                                localeCode={getLinkLocaleSlug()}
                                variation="navigation"
                                className={classNames(styles.searchToggle, {
                                    [styles.hidden]: isMenuOpen,
                                })}
                                icon={isSearchWidgetShown && isMobile ? IconClose : IconSearch}
                                onClick={toggleSearchWidget}
                                aria-expanded={isSearchWidgetShown}
                                aria-controls="search-widget"
                                title={formatMessage(translations.search.title)}
                                aria-label={formatMessage(translations.search.title)}
                            >
                                Search
                            </ButtonLink>
                        )}

                        <div
                            className={classNames(styles.navigation, { [styles.open]: isMenuOpen })}
                        >
                            <div role="none" className={styles.backdrop} onClick={closeMenu} />
                            <ul id="menu" className={styles.navigationInner}>
                                {contacts && contacts.length > 0 && contacts.some(contact => 
                                    contact.display_locales.some(locale => {
                                        const normalizedLocaleCode = locale.code.replace('_', '-');
                                        const normalizedCurrentLocale = currentLocale.localeCode.replace('_', '-');
                                        return normalizedLocaleCode === normalizedCurrentLocale || 
                                               locale.language_code === currentLocale.localeCode;
                                    })
                                ) && (
                                    <li className={styles.navigationItem}>
                                        <ButtonLink
                                            href="/#contacts"
                                            localeCode={getLinkLocaleSlug()}
                                            variation="navigation"
                                            className={styles.navigationButton}
                                            icon={IconEmail}
                                        >
                                            <FormattedMessage
                                                {...translations.contacts.title}
                                            />
                                        </ButtonLink>
                                    </li>
                                )}
                                {public_galleries_number > 0 && (
                                    <li className={styles.navigationItem}>
                                        <ButtonLink
                                            href="/media"
                                            localeCode={getLinkLocaleSlug()}
                                            variation="navigation"
                                            className={styles.navigationButton}
                                            icon={IconImage}
                                        >
                                            <FormattedMessage
                                                {...translations.mediaGallery.title}
                                            />
                                        </ButtonLink>
                                    </li>
                                )}
                                {isMobile && (
                                    <CategoriesDropdown
                                        categories={categories}
                                        buttonClassName={styles.navigationButton}
                                        navigationItemClassName={styles.navigationItem}
                                        navigationButtonClassName={styles.navigationButton}
                                    />
                                )}
                                <LanguagesDropdown
                                    buttonClassName={styles.navigationButton}
                                    navigationItemClassName={styles.navigationItem}
                                    hasError={hasError}
                                />
                            </ul>
                        </div>

                        {searchSettings && (
                            <SearchWidget
                                dialogClassName={styles.mobileSearchWrapper}
                                isOpen={isSearchWidgetShown}
                                settings={searchSettings}
                                onClose={closeSearchWidget}
                            />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
