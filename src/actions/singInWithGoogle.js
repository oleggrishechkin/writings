import config from '../config.json';
import LocalStorage from '../proxies/LocalStorage';
import getParams from '../utils/getParams';

const signInWithGoogle = async () => {
    const width = 500;
    const height = 600;
    const left = Math.max((window.screen.availWidth - width) / 2, 0);
    const top = Math.max((window.screen.availHeight - height) / 2, 0);
    const oauthWindow = window.open(
        'about:blank',
        'OAuth',
        `width=${width},height=${height},top=${top},left=${left},location=yes,resizable=yes,statusbar=yes,toolbar=no`
    );
    const { authUri, sessionId } = await window
        .fetch(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${config.firebase.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                continueUri: config.firebase.continueUri,
                providerId: 'google.com',
                oauthScope: 'https://www.googleapis.com/auth/userinfo.profile',
                authFlowType: 'CODE_FLOW'
            })
        })
        .then((response) => response.json());
    const requestUri = await new Promise((resolve, reject) => {
        oauthWindow.location.assign(authUri);
        window.addEventListener(
            'message',
            (event) => {
                const { href, search, hash } = JSON.parse(event.data);
                const error = getParams(search).error || getParams(hash).error;

                oauthWindow.close();

                if (error) {
                    reject(error);

                    return;
                }

                resolve(href);
            },
            { once: true }
        );
    });
    const user = await window
        .fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.firebase.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestUri,
                sessionId,
                returnIdpCredential: true,
                returnSecureToken: true
            })
        })
        .then((response) => response.json());

    user.expires = Date.now() + +user.expiresIn * 1000;

    return LocalStorage.setItem('user', user);
};

export default signInWithGoogle;
