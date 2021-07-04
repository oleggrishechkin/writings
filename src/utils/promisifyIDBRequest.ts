const promisifyIDBRequest = <Type>(request: IDBRequest<Type>): Promise<Type> =>
    new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            reject(event);
        };
    });

export default promisifyIDBRequest;
