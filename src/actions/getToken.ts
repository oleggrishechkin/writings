import userState, { IUser } from '../store/states/userState';
import Auth from '../classes/Auth';

const getToken = async (): Promise<IUser['idToken']> => {
    const user = userState();

    if (!user) {
        throw new Error();
    }

    if (!!user && user.expires > Date.now()) {
        return user.idToken;
    }

    const refreshedData = await Auth.refreshToken(user.refreshToken);

    userState(
        (currentUser) =>
            currentUser && {
                ...currentUser,
                ...refreshedData
            }
    );

    return refreshedData.idToken;
};

export default getToken;
