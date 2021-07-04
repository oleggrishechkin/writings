const objectStoreTransaction =
    (db: IDBDatabase) =>
    (name: string): IDBObjectStore => {
        return db.transaction([name], 'readwrite').objectStore(name);
    };

export default objectStoreTransaction;
