import { useEffect } from 'react';

const useTouchEvents = (): void => {
    useEffect(() => {
        const handleTouchStart = () => {};
        document.body.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            document.body.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);
};

export default useTouchEvents;
