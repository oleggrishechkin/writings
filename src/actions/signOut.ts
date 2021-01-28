import resetEvent from '../events/resetEvent';

const signOut = async (): Promise<void> => {
    window.localStorage.clear();
    resetEvent();
};

export default signOut;
