import config from '../config';
import toSearch from '../utils/toSearch';

const token = (
    refreshToken: string
): Promise<{
    id_token: string;
    refresh_token: string;
    expires_in: string;
}> =>
    window
        .fetch(`https://securetoken.googleapis.com/v1/token${toSearch({ key: config.firebase.apiKey })}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: toSearch({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }).slice(1)
        })
        .then((response) => response.json());

export default token;
