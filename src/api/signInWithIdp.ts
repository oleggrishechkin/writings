import config from '../config';
import { IUser } from '../states/userState';
import toSearch from '../utils/toSearch';

const signInWithIdp = (requestUri: string, sessionId: string): Promise<Omit<IUser, 'expires'>> =>
    window
        .fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp${toSearch({
                key: config.firebase.apiKey
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
        .then((response) => response.json());

export default signInWithIdp;
