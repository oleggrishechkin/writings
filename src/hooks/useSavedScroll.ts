import { useEffect } from 'react';
import LocalStorage from '../classes/LocalStorage';

const savedScroll = LocalStorage.get('savedScroll') || {};

window.addEventListener(
    'beforeunload',
    () => {
        LocalStorage.set('savedScroll', savedScroll);
    },
    { passive: true }
);

const useSavedScroll = (name: string): void => {
    useEffect(() => {
        const handleScroll = () => {
            const value = document.documentElement.scrollTop;

            if (value) {
                savedScroll[name] = value;

                return;
            }

            delete savedScroll[name];
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        const scrollTop = savedScroll[name];
        let frameId: number;

        if (scrollTop) {
            const frame = () => {
                if (document.documentElement.scrollHeight - document.documentElement.clientHeight >= scrollTop) {
                    document.documentElement.scrollTop = scrollTop;

                    return;
                }

                frameId = window.requestAnimationFrame(frame);
            };

            frame();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.cancelAnimationFrame(frameId);
        };
    }, [name]);
};

export default useSavedScroll;
