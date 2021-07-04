import { TouchEventHandler, useCallback, useEffect, useRef, useState } from 'react';

const useSlideDown = (
    onSlideDown: () => void
): {
    onTouchStart: TouchEventHandler;
    dragging: boolean;
    diff: number;
} => {
    const [state, setState] = useState<[number, number] | null>(null);
    const isDownRef = useRef(false);
    const onTouchMove = useCallback((event: TouchEvent) => {
        const touch = event.touches.item(0);

        if (touch) {
            const clientY = touch.clientY;

            setState((currentState) => {
                if (!currentState || currentState[1] === clientY) {
                    return currentState;
                }

                isDownRef.current = currentState[1] < clientY;

                return [currentState[0], clientY];
            });
        }
    }, []);
    const onTouchEnd = useCallback(() => {
        setState((currentState) => {
            if (isDownRef.current && currentState && currentState[1] - currentState[0] > 10) {
                onSlideDown();
            }

            return null;
        });
    }, [onSlideDown]);
    const onTouchStart: TouchEventHandler = useCallback(
        (event) => {
            const touch = event.touches.item(0);

            if (touch) {
                const clientY = touch.clientY;

                window.addEventListener('touchmove', onTouchMove, { passive: true });
                window.addEventListener('touchend', onTouchEnd, { passive: true });
                setState([clientY, clientY]);
            }
        },
        [onTouchEnd, onTouchMove]
    );

    useEffect(
        () => () => {
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        },
        [onTouchMove, onTouchEnd]
    );

    return {
        onTouchStart,
        dragging: !!state,
        diff: state ? state[1] - state[0] : 0
    };
};

export default useSlideDown;
