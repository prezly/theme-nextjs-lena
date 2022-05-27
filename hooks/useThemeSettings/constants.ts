import type { ThemeSettingsApiResponse } from 'types';
import { Font } from 'types';

export const STORAGE_KEY = 'themePreview';

export const DEFAULT_THEME_SETTINGS: ThemeSettingsApiResponse = {
    accent_color: '#14b8a6',
    font: Font.MULISH,
    header_background_color: '#ffffff',
    header_link_color: '#475569',
    show_date: true,
    show_subtitle: true,
};
