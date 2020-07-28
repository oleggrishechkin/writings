class IHistory {
    constructor() {
        this._listeners = new Set();

        window.addEventListener('popstate', () => this._dispatch(), { passive: true });
    }

    _dispatch() {
        this._listeners.forEach((callback) => callback());
    }

    on(callback) {
        this._listeners.add(callback);

        return () => this._listeners.delete(callback);
    }

    pushState(state = null, url = '') {
        window.history.pushState(state, '', url);
        this._dispatch();
    }

    back() {
        window.history.back();
        this._dispatch();
    }
}

const History = new IHistory();

export default History;
