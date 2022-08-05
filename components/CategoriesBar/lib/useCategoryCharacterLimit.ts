import { useWindowSize } from '@react-hookz/web';

export function useCategoryCharacterLimit() {
    const { width } = useWindowSize(undefined, true);

    if (width >= 1200) {
        return 150;
    }

    if (width >= 700 && width <= 750) {
        return 65;
    }

    if (width > 600) {
        // We can fit about 10 extra characters per extra 100 pixels of screen width
        return Math.floor(width / 100) * 10;
    }

    if (width > 500) {
        return 45;
    }

    return 30;
}
