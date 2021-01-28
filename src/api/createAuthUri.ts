import config from '../config';
import toSearch from '../utils/toSearch';

const createAuthUri = (): Promise<{
    authUri: string;
    sessionId: string;
}> =>
    window
        .fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri${toSearch({
                key: config.firebase.apiKey
            })}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    continueUri: config.firebase.continueUri,
                    providerId: 'google.com',
                    oauthScope: 'https://www.googleapis.com/auth/userinfo.profile',
                    authFlowType: 'CODE_FLOW'
                })
            }
        )
        .then((response) => response.json());

export default createAuthUri;
