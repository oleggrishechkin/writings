import paramsToSearch from '../utils/paramsToSearch';
import firebaseConfig from '../firebase.config.json';
import getExpires from '../utils/getExpires';
import searchToParams from '../utils/searchToParams';

export interface IUser {
    localId: string;
    photoUrl: string;
    displayName: string;
    email: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    expires: number;
}

class AuthClass {
    readonly #apiKey: string;
    readonly #continueUri: string;

    constructor({ apiKey, continueUri }: { apiKey: string; continueUri: string }) {
        this.#apiKey = apiKey;
        this.#continueUri = continueUri;
    }

    private createAuthUri(): Promise<{ authUri: string; sessionId: string }> {
        return window
            .fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri${paramsToSearch({
                    key: this.#apiKey
                })}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        continueUri: this.#continueUri,
                        providerId: 'google.com',
                        oauthScope: 'https://www.googleapis.com/auth/userinfo.profile',
                        authFlowType: 'CODE_FLOW'
                    })
                }
            )
            .then((response) => response.json());
    }

    private signInWithIdp(requestUri: string, sessionId: string): Promise<IUser> {
        return window
            .fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp${paramsToSearch({
                    key: this.#apiKey
                })}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestUri,
                        sessionId,
                        returnIdpCredential: true,
                        returnSecureToken: true
                    })
                }
            )
            .then((response) => response.json())
            .then((response: IUser) => ({ ...response, expires: getExpires(response.expiresIn) }));
    }

    refreshToken(refreshToken: string): Promise<{
        idToken: IUser['idToken'];
        refreshToken: IUser['refreshToken'];
        expiresIn: IUser['expiresIn'];
        expires: IUser['expires'];
    }> {
        return window
            .fetch(`https://securetoken.googleapis.com/v1/token${paramsToSearch({ key: this.#apiKey })}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: paramsToSearch({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }).slice(1)
            })
            .then((response) => response.json())
            .then((response: { id_token: string; refresh_token: string; expires_in: string }) => ({
                idToken: response.id_token,
                refreshToken: response.refresh_token,
                expiresIn: response.expires_in,
                expires: getExpires(response.expires_in)
            }));
    }

    async signInWithGoogle(): Promise<IUser> {
        const width = 500;
        const height = 600;
        const left = Math.max((window.screen.availWidth - width) / 2, 0);
        const top = Math.max((window.screen.availHeight - height) / 2, 0);
        const oauthWindow = window.open(
            'about:blank',
            'OAuth',
            `width=${width},height=${height},top=${top},left=${left},location=yes,resizable=yes,statusbar=yes,toolbar=no`
        );
        const { authUri, sessionId } = await this.createAuthUri();
        const requestUri: string = await new Promise((resolve, reject) => {
            if (!oauthWindow) {
                reject();

                return;
            }

            oauthWindow.location.assign(authUri);
            window.addEventListener(
                'message',
                (event) => {
                    const { href, search, hash } = JSON.parse(event.data);
                    const error = searchToParams(search).error || searchToParams(hash).error;

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

        return this.signInWithIdp(requestUri, sessionId);
    }
}

const Auth = new AuthClass(firebaseConfig);

export default Auth;
