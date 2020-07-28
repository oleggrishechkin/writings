import LocalStorage from '../proxies/LocalStorage';
import refreshToken from './refreshIdToken';

const getIdToken = async () => {
    const user = LocalStorage.getItem('user');

    if (user.expires > Date.now()) {
        return user.idToken;
    }

    return (await refreshToken()).idToken;
};

export default getIdToken;
