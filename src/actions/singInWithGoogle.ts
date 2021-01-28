import userState from '../store/states/userState';
import Auth from '../classes/Auth';

const signInWithGoogle = async (): Promise<void> => {
    userState(await Auth.signInWithGoogle());
};

export default signInWithGoogle;
