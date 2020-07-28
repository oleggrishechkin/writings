import config from '../config.json';

class IIndexedDB {
    constructor({ name, version, stores }) {
        this._name = name;
        this._version = version;
        this._stores = stores;
        this._db = null;
        this._dbPromise = null;
        this._listeners = new Map();
    }

    _dispatch(name, key, data) {
        if (!name) {
            this._listeners.forEach((callbacks) => callbacks.forEach((callback) => callback(key, data)));

            return;
        }

        if (this._listeners.has(name)) {
            this._listeners.get(name).forEach((callback) => callback(key, data));
        }
    }

    on(name, key, callback) {
        const keyCallback = (callbackKey, callbackData) => {
            if (!key || !callbackKey || callbackKey === key) {
                callback(callbackKey, callbackData);
            }
        };

        if (this._listeners.has(name)) {
            this._listeners.get(name).add(keyCallback);
        } else {
            this._listeners.set(name, new Set([keyCallback]));
        }

        return () => {
            this._listeners.get(name).delete(keyCallback);

            if (this._listeners.get(name).size === 0) {
                this._listeners.delete(name);
            }
        };
    }

    async _getDB() {
        if (this._db) {
            return this._db;
        }

        if (this._dbPromise) {
            return this._dbPromise;
        }

        this._dbPromise = new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this._name, this._version);

            request.onsuccess = (event) => {
                this._db = event.target.result;
                resolve(this._db);
            };
            request.onerror = (event) => {
                reject(event);
            };
            request.onupgradeneeded = (event) => {
                this._db = event.target.result;
                Object.keys(this._stores).forEach((name) => {
                    this._db.createObjectStore(name, this._stores[name]);
                });
            };
        });

        return this._dbPromise;
    }

    async _store(method, name, ...args) {
        const db = await this._getDB();

        return new Promise((resolve, reject) => {
            const request = db
                .transaction([name], 'readwrite')
                .objectStore(name)
                [method](...args);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                reject(event);
            };
        });
    }

    getAll(name) {
        return this._store('getAll', name);
    }

    get(name, key) {
        return this._store('get', name, key);
    }

    async put(name, data) {
        const keyPath = this._stores[name].keyPath;

        await this._store('put', name, data);

        this._dispatch(name, data[keyPath], data);

        return data;
    }

    async putAll(name, data) {
        await this._store('clear', name);
        await Promise.all(data.map((data) => this._store('put', name, data)));

        const allData = await this._store('getAll', name);

        this._dispatch(name, null, allData);

        return allData;
    }

    async delete(name, key) {
        await this._store('delete', name, key);

        this._dispatch(name, key, undefined);
    }

    async clear(name) {
        await this._store('clear', name);

        this._dispatch(name, null, []);
    }
}

const IndexedDB = new IIndexedDB(config.indexedDB);

export default IndexedDB;
