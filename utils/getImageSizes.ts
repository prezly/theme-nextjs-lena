export type CardSize = 'default' | 'big' | 'tiny';

export function getCardImageSizes(desiredSize: CardSize) {
    if (desiredSize === 'tiny') {
        return {
            default: 60,
        };
    }

    return {
        mobile: 420,
        tablet: desiredSize === 'big' ? 800 : 350,
        desktop: desiredSize === 'big' ? 1120 : 350,
        default: 1120,
    };
}

export function getStoryImageSizes() {
    return {
        mobile: 420,
        default: 720,
    };
}
