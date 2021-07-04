import userState from '../store/states/userState';
import { IUser } from '../classes/Auth';

const getLocalId = (): IUser['localId'] => {
    const user = userState();

    if (!user) {
        throw new Error();
    }

    return user.localId;
};

export default getLocalId;
