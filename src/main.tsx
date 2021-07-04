import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './main.css';
import { pathToRegexp } from 'path-to-regexp';
import App from './App';

if (pathToRegexp('/oauth').test(window.location.pathname) && window.opener) {
    window.opener.postMessage(JSON.stringify(window.location), '*');
} else {
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
