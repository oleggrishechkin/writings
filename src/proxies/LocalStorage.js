class ILocalStorage {
    constructor() {
        this._listeners = new Map();
    }

    _dispatch(key, value) {
        if (!key) {
            this._listeners.forEach((callbacks) => callbacks.forEach((callback) => callback(value)));

            return;
        }

        if (this._listeners.has(key)) {
            this._listeners.get(key).forEach((callback) => callback(value));
        }
    }

    on(key, callback) {
        if (this._listeners.has(key)) {
            this._listeners.get(key).add(callback);
        } else {
            this._listeners.set(key, new Set([callback]));
        }

        return () => {
            this._listeners.get(key).delete(callback);

            if (this._listeners.get(key).size === 0) {
                this._listeners.delete(key);
            }
        };
    }

    getItem(key) {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : item;
    }

    setItem(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        this._dispatch(key, value);

        return value;
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
        this._dispatch(key, null);

        return null;
    }

    clear() {
        window.localStorage.clear();
        this._dispatch(null, null);

        return null;
    }
}

const LocalStorage = new ILocalStorage();

export default LocalStorage;
