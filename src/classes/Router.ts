import popStateEvent from '../store/events/popStateEvent';

class IRouter {
    readonly paths = {
        writings: '/',
        writing: '/writings/:writingId'
    };

    constructor() {
        window.addEventListener(
            'popstate',
            () => {
                popStateEvent();
            },
            { passive: true }
        );
    }

    push(url: string) {
        window.history.pushState(window.history.state, '', url);
        popStateEvent();
    }

    back() {
        window.history.back();
        popStateEvent();
    }

    match<Type extends Record<string, string>>(path: string, url: string): false | Type {
        const splitPath = path.split('/');
        const splitUrl = url.split('/');

        if (splitPath.length !== splitUrl.length) {
            return false;
        }

        const params: Record<string, string> = {};

        for (let index = 0; index < splitPath.length; ++index) {
            if (splitPath[index].includes(':')) {
                params[splitPath[index].slice(1)] = splitUrl[index];

                continue;
            }

            if (splitPath[index] !== splitUrl[index]) {
                return false;
            }
        }

        return params as Type;
    }
}

const Router = new IRouter();

export default Router;
