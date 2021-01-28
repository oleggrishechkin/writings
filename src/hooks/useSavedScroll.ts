import { RefObject, UIEventHandler, useCallback, useEffect } from 'react';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import localStorageKeys from '../constants/localStorageKeys';
import setLocalStorageItem from '../utils/setLocalStorageItem';
import useInnerRef from './useInnerRef';

const savedScroll: Record<string, number> = getLocalStorageItem(localStorageKeys.savedScroll) || {};

window.addEventListener(
    'beforeunload',
    () => {
        if (Object.keys(savedScroll).length) {
            setLocalStorageItem(localStorageKeys.savedScroll, savedScroll);
        } else {
            window.localStorage.removeItem(localStorageKeys.savedScroll);
        }
    },
    { passive: true }
);

const useSavedScroll = (name?: string, innerRef?: RefObject<HTMLElement>): [RefObject<HTMLElement>, UIEventHandler] => {
    const ref = useInnerRef<HTMLElement>(innerRef);
    const onScroll = useCallback(
        (event) => {
            if (name) {
                const value = (event.target as HTMLElement).scrollTop;

                if (value) {
                    savedScroll[name] = value;
                } else {
                    delete savedScroll[name];
                }
            }
        },
        [name]
    );

    useEffect(() => {
        if (!name) {
            return;
        }

        const scrollTop = savedScroll[name];
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
