import { render } from 'solid-js/dom';
import App from './App';
import matchPath from './utils/matchPath';

if (matchPath('/oauth', window.location.pathname) && window.opener) {
    window.opener.postMessage(JSON.stringify(window.location), '*');
} else {
    render(App, document.getElementById('root'));
}

if (process.env.NODE_ENV === 'production' && window.navigator.serviceWorker) {
    window.navigator.serviceWorker.register('./service-worker.js');
}
