import config from '../config.json';
import LocalStorage from '../proxies/LocalStorage';
import getSearch from '../utils/getSearch';

const refreshToken = async () => {
    const user = LocalStorage.getItem('user');
    const { id_token, refresh_token, expires_in } = await window
        .fetch(`https://securetoken.googleapis.com/v1/token?key=${config.firebase.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: getSearch({
                grant_type: 'refresh_token',
                refresh_token: user.refreshToken
            }).slice(1)
        })
        .then((response) => response.json());

    user.idToken = id_token;
    user.refreshToken = refresh_token;
    user.expiresIn = expires_in;
    user.expires = Date.now() + +expires_in * 1000;

    return LocalStorage.setItem('user', user);
};

export default refreshToken;
