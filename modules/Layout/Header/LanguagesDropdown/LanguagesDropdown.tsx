import { ACTIONS, useAnalytics } from '@prezly/analytics-nextjs';
import { getLanguageDisplayName, getUsedLanguages, LocaleObject } from '@prezly/theme-kit-core';
import {
    useCurrentLocale,
    useCurrentStory,
    useGetLinkLocaleSlug,
    useGetTranslationUrl,
    useLanguages,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { useMemo } from 'react';

import { Dropdown } from '@/components';
import { IconGlobe } from '@/icons';

import styles from './LanguagesDropdown.module.scss';

type Props = {
    buttonClassName?: string;
    navigationItemClassName?: string;
    hasError?: boolean;
};

function LanguagesDropdown({ buttonClassName, navigationItemClassName, hasError }: Props) {
    const { track } = useAnalytics();
    const currentLocale = useCurrentLocale();
    const languages = useLanguages();
    const getTranslationUrl = useGetTranslationUrl();
    const currentStory = useCurrentStory();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    const currentLanguage = useMemo(
        () => languages.find((language) => language.code === currentLocale.toUnderscoreCode()),
        [currentLocale, languages],
    );

    const displayedLanguages = useMemo(() => {
        if (!languages.length) {
            return [];
        }

        return getUsedLanguages(languages).filter(
            (language) => language.code !== currentLocale.toUnderscoreCode(),
        );
    }, [currentLocale, languages]);

    // Don't show language selector if there are no other locale to choose
    if (!currentLanguage || displayedLanguages.length < 1) {
        return null;
    }

    return (
        <li className={navigationItemClassName}>
            <Dropdown
                icon={IconGlobe}
                label={getLanguageDisplayName(currentLanguage, languages)}
                className={styles.container}
                menuClassName={styles.menu}
                activeClassName={styles.active}
                buttonClassName={classNames(buttonClassName, styles.button)}
                withMobileDisplay
            >
                {displayedLanguages.map((language) => {
                    const locale = LocaleObject.fromAnyCode(language.code);
                    const translationLink = hasError ? '/' : getTranslationUrl(locale);

                    return (
                        <Dropdown.Item
                            key={locale.toHyphenCode()}
                            href={translationLink}
                            localeCode={
                                currentStory && translationLink !== '/'
                                    ? false
                                    : getLinkLocaleSlug(locale)
                            }
                            forceRefresh
                            onClick={() =>
                                track(ACTIONS.SWITCH_LANGUAGE, { code: locale.toHyphenCode() })
                            }
                            withMobileDisplay
                        >
                            <span className={styles.title}>
                                {getLanguageDisplayName(language, languages)}
                            </span>
                        </Dropdown.Item>
                    );
                })}
            </Dropdown>
        </li>
    );
}

export default LanguagesDropdown;
