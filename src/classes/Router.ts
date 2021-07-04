import popStateEvent from '../store/events/popStateEvent';

class RouterClass {
    constructor() {
        window.addEventListener(
            'popstate',
            () => {
                popStateEvent();
            },
            { passive: true }
        );
    }

    replace(url: string) {
        window.history.replaceState(window.history.state, '', url);
        popStateEvent();
    }

    push(url: string) {
        window.history.pushState(window.history.state, '', url);
        popStateEvent();
    }

    back() {
        window.history.back();
        popStateEvent();
    }
}

const Router = new RouterClass();

export default Router;
