import popStateEvent from '../events/popStateEvent';

const navPush = (url: string): void => {
    window.history.pushState(window.history.state, '', url);
    popStateEvent();
};

export default navPush;
