import userState, { IUser } from '../states/userState';
import errorMessages from '../constants/errorMessages';
import token from '../api/token';
import getExpires from '../utils/getExpires';

const refreshToken = async (): Promise<IUser['idToken']> => {
    const user = userState();

    if (!user) {
        throw new Error(errorMessages.userNotFound);
    }

    const { id_token, refresh_token, expires_in } = await token(user.refreshToken);

    userState(
        (currentUser) =>
            currentUser && {
                ...currentUser,
                idToken: id_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                expires: getExpires(expires_in)
            }
    );

    return id_token;
};

export default refreshToken;
