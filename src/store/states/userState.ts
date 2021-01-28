import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

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

const getInitialState = (): IUser => LocalStorage.get(LocalStorage.paths.user) || null;

const userState = createState<null | IUser>(getInitialState());

userState``((user) => {
    LocalStorage.set(LocalStorage.paths.user, user);
});

resetEvent``(() => {
    userState(getInitialState);
});

export default userState;
