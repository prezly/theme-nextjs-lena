/* eslint-disable @typescript-eslint/no-use-before-define */
import { useResizeObserver } from '@react-hookz/web';
import { type RefObject, useState } from 'react';

interface RectResult {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}

export function useRect<T extends HTMLElement>(ref: RefObject<T>) {
    const [rect, setRect] = useState<RectResult>(
        ref && ref.current ? getRect(ref.current) : getRect(),
    );

    useResizeObserver(ref, () => {
        if (ref.current) {
            setRect(getRect(ref.current));
        }
    });

    return rect;
}

function getRect<T extends HTMLElement>(element?: T) {
    let rect: RectResult = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    };
    if (element) rect = element.getBoundingClientRect();
    return rect;
}
