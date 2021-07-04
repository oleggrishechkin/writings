import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/user') || null;

const userState = createState(getInitialState());

userState``((user) => {
    LocalStorage.set('state/user', user);
});

resetEvent``(() => {
    userState(getInitialState);
});

export default userState;
