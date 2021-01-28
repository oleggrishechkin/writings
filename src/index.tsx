import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import match from './utils/match';

if (!!match('/oauth', window.location.pathname) && window.opener) {
    window.opener.postMessage(JSON.stringify(window.location), '*');
} else {
    document.body.addEventListener('touchstart', () => {}, { passive: true });

    if (window.visualViewport) {
        window.visualViewport.addEventListener(
            'resize',
            () => {
                const rootElement = document.getElementById('root');

                if (rootElement) {
                    rootElement.style.maxHeight = `${window.visualViewport.height}px`;
                }
            },
            { passive: true }
        );
    }

    render(
        <StrictMode>
            <App />
        </StrictMode>,
        document.getElementById('root')
    );
}

if (process.env.NODE_ENV === 'production' && window.navigator.serviceWorker) {
    window.navigator.serviceWorker.register('./service-worker.js');
}
