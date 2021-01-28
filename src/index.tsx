import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import Router from './classes/Router';

if (!!Router.match('/oauth', window.location.pathname) && window.opener) {
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
