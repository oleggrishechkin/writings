import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import localStorageKeys from '../constants/localStorageKeys';
import setLocalStorageItem from '../utils/setLocalStorageItem';

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

const getInitialState = (): IUser => getLocalStorageItem(localStorageKeys.user) || null;

const userState = createState<null | IUser>(getInitialState());

userState``((user) => {
    setLocalStorageItem(localStorageKeys.user, user);
});

resetEvent``(() => {
    userState(getInitialState);
});

export default userState;
