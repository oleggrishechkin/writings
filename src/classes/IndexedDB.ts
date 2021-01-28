import config from '../config';

const indexedDB = window.indexedDB;

class IIndexedDB {
    readonly #name: string;
    readonly #version: number;
    readonly #stores: Record<string, IDBObjectStoreParameters>;
    #dbPromise: Promise<IDBDatabase> | null;
    readonly paths = {
        writings: 'writings'
    };

    constructor({
        name,
        version,
        stores
    }: {
        name: string;
        version: number;
        stores: Record<string, IDBObjectStoreParameters>;
    }) {
        this.#name = name;
        this.#version = version;
        this.#stores = stores;
        this.#dbPromise = null;
    }

    static promisifyIDBRequest<Type>(request: IDBRequest<Type>): Promise<Type> {
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(event);
            };
        });
    }

    static getObjectStore(db: IDBDatabase, name: string): IDBObjectStore {
        return db.transaction([name], 'readwrite').objectStore(name);
    }

    private async _getDB() {
        return (
            this.#dbPromise ||
            (this.#dbPromise = new Promise((resolve, reject) => {
                const request = indexedDB.open(this.#name, this.#version);

                request.onsuccess = () => {
                    resolve(request.result);
                };
                request.onerror = (event) => {
                    reject(event);
                };
                request.onupgradeneeded = () => {
                    resolve(request.result);
                    Object.keys(this.#stores).forEach((name) => {
                        request.result.createObjectStore(name, this.#stores[name]);
                    });
                };
            }))
        );
    }

    async getAll<Type>(name: string): Promise<Type[]> {
        return IIndexedDB.promisifyIDBRequest<Type[]>(IIndexedDB.getObjectStore(await this._getDB(), name).getAll());
    }

    async get<Type>(name: string, key: string): Promise<Type> {
        return IIndexedDB.promisifyIDBRequest<Type>(IIndexedDB.getObjectStore(await this._getDB(), name).get(key));
    }

    async put(name: string, data: any): Promise<void> {
        await IIndexedDB.promisifyIDBRequest(IIndexedDB.getObjectStore(await this._getDB(), name).put(data));
    }

    async putAll(name: string, data: any[]): Promise<void> {
        await this.clear(name);
        await Promise.all(data.map((data) => this.put(name, data)));
    }

    async delete(name: string, key: string): Promise<void> {
        await IIndexedDB.promisifyIDBRequest(IIndexedDB.getObjectStore(await this._getDB(), name).delete(key));
    }

    async clear(name: string): Promise<void> {
        await IIndexedDB.promisifyIDBRequest(IIndexedDB.getObjectStore(await this._getDB(), name).clear());
    }

    async clearAll(): Promise<void> {
        const db = await this._getDB();
        await Promise.all(
            Object.keys(this.#stores).map((name) =>
                IIndexedDB.promisifyIDBRequest(IIndexedDB.getObjectStore(db, name).clear())
            )
        );
    }
}

const IndexedDB = new IIndexedDB(config.indexedDB);

export default IndexedDB;
