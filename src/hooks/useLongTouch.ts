import { TouchEventHandler, useCallback, useRef } from 'react';

const useLongTouch = (handler: TouchEventHandler): [TouchEventHandler, TouchEventHandler] => {
    const timeoutRef = useRef<any>();

    const onTouchStart = useCallback(
        (event) => {
            timeoutRef.current = setTimeout(() => {
                handler(event);
            }, 500);

            return () => {
                clearTimeout(timeoutRef.current);
            };
        },
        [handler]
    );
    const onTouchEndOrMove = useCallback(() => {
        clearTimeout(timeoutRef.current);
    }, []);

    return [onTouchStart, onTouchEndOrMove];
};

export default useLongTouch;
