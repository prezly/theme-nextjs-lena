/* eslint-disable @typescript-eslint/no-use-before-define */
export type CardSize = 'default' | 'big' | 'tiny';

export function getCardImageSizes(cardSize: CardSize) {
    if (cardSize === 'tiny') {
        return '60px';
    }

    return [
        '(max-width: 430px) 420px',
        `(max-width: 1023px) ${getTabletImageSize(cardSize)}`,
        getDesktopImageSize(cardSize),
    ].join(', ');
}

function getTabletImageSize(cardSize: CardSize) {
    switch (cardSize) {
        case 'big':
            return '800px';
        default:
            return '350px';
    }
}

function getDesktopImageSize(cardSize: CardSize) {
    switch (cardSize) {
        case 'big':
            return '1120px';
        default:
            return '350px';
    }
}
