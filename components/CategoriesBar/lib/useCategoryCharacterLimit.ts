import { useWindowSize } from '@react-hookz/web';

export function useCategoryCharacterLimit() {
    const { width } = useWindowSize(undefined, true);

    if (width >= 1200) {
        return 120;
    }

    if (width > 500) {
        // We can fit about 10 extra characters per extra 100 pixels of screen width
        return Math.floor(width / 100) * 10;
    }

    return 40;
}
