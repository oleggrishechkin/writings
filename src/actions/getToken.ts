import userState, { IUser } from '../states/userState';
import errorMessages from '../constants/errorMessages';
import refreshToken from './refreshToken';

const getToken = async (): Promise<IUser['idToken']> => {
    const user = userState();

    if (!user) {
        throw new Error(errorMessages.userNotFound);
    }

    if (!!user && user.expires > Date.now()) {
        return user.idToken;
    }

    return refreshToken();
};

export default getToken;
