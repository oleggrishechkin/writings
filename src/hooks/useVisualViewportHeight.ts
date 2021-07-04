import { useEffect } from 'react';

const useVisualViewportHeight = (): void => {
    useEffect(() => {
        if (window.visualViewport) {
            const handleResize = () => {
                const root = document.getElementById('root');

                if (root) {
                    root.style.maxHeight = `${window.visualViewport.height}px`;
                }
            };

            window.visualViewport.addEventListener('resize', handleResize, { passive: true });

            return () => {
                window.visualViewport.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return;
};

export default useVisualViewportHeight;
