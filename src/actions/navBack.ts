import popStateEvent from '../events/popStateEvent';

const navBack = (): void => {
    window.history.back();
    popStateEvent();
};

export default navBack;
