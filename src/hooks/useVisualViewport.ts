import { useEffect } from 'react';

const useVisualViewport = (): void => {
    useEffect(() => {
        if (window.visualViewport) {
            const handleResize = () => {
                const rootElement = document.getElementById('root');

                if (rootElement) {
                    rootElement.style.maxHeight = `${window.visualViewport.height}px`;
                }
            };

            window.visualViewport.addEventListener('resize', handleResize, { passive: true });

            return () => {
                window.visualViewport.removeEventListener('resize', handleResize);
            };
        }
    }, []);
};

export default useVisualViewport;
