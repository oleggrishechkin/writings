import { RefObject, UIEventHandler, useCallback, useEffect } from 'react';
import SavedScroll from '../classes/SavedScroll';
import useInnerRef from './useInnerRef';

const useSavedScroll = (name?: string, innerRef?: RefObject<HTMLElement>): [RefObject<HTMLElement>, UIEventHandler] => {
    const ref = useInnerRef<HTMLElement>(innerRef);
    const onScroll = useCallback(
        (event) => {
            if (name) {
                const value = (event.target as HTMLElement).scrollTop;

                SavedScroll.set(name, value);
            }
        },
        [name]
    );

    useEffect(() => {
        if (!name) {
            return;
        }

        const scrollTop = SavedScroll.get(name);
        let frameId: number;

        if (scrollTop) {
            const frame = () => {
                if (!!ref.current && ref.current.scrollHeight - ref.current.clientHeight >= scrollTop) {
                    ref.current.scrollTop = scrollTop;

                    return;
                }

                frameId = window.requestAnimationFrame(frame);
            };

            frame();
        }

        return () => {
            window.clearTimeout(frameId);
        };
    }, [name, ref]);

    return [ref, onScroll];
};

export default useSavedScroll;
