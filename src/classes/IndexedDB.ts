import indexedDBConfig from '../indexedDB.config.json';
import promisifyIDBRequest from '../utils/promisifyIDBRequest';
import objectStoreTransaction from '../utils/objectStoreTransaction';
import { IWriting } from './Database';

const indexedDB = window.indexedDB;

interface IIndexedDBSchema {
    writings: Array<IWriting>;
}

class IndexedDBClass {
    readonly #name: string;
    readonly #version: number;
    readonly #stores: Record<string, IDBObjectStoreParameters>;
    #dbPromise: Promise<IDBDatabase> | null;

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
                request.onupgradeneeded = (event) => {
                    Object.keys(this.#stores).forEach((name) => {
                        request.result.createObjectStore(name, this.#stores[name]);
                    });
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    event.target.transaction.oncomplete = () => {
                        resolve(request.result);
                    };
                };
            }))
        );
    }

    async getAll<Type extends keyof IIndexedDBSchema>(name: Type): Promise<IIndexedDBSchema[Type]> {
        return promisifyIDBRequest<IIndexedDBSchema[Type]>(objectStoreTransaction(await this._getDB())(name).getAll());
    }

    async get<Type extends keyof IIndexedDBSchema>(name: Type, key: string): Promise<IIndexedDBSchema[Type][number]> {
        return promisifyIDBRequest<IIndexedDBSchema[Type][number]>(
            objectStoreTransaction(await this._getDB())(name).get(key)
        );
    }
    async put<Type extends keyof IIndexedDBSchema>(name: Type, data: IIndexedDBSchema[Type][number]): Promise<void> {
        await promisifyIDBRequest(objectStoreTransaction(await this._getDB())(name).put(data));
    }

    async clear(name: keyof IIndexedDBSchema): Promise<void> {
        await promisifyIDBRequest(objectStoreTransaction(await this._getDB())(name).clear());
    }

    async putAll<Type extends keyof IIndexedDBSchema>(name: Type, data: IIndexedDBSchema[Type]): Promise<void> {
        await this.clear(name);
        await Promise.all(data.map((data) => this.put(name, data)));
    }

    async delete(name: keyof IIndexedDBSchema, key: string): Promise<void> {
        await promisifyIDBRequest(objectStoreTransaction(await this._getDB())(name).delete(key));
    }

    async clearAll(): Promise<void> {
        const transaction = objectStoreTransaction(await this._getDB());

        await Promise.all(Object.keys(this.#stores).map((name) => promisifyIDBRequest(transaction(name).clear())));
    }
}

const IndexedDB = new IndexedDBClass(indexedDBConfig);

export default IndexedDB;
