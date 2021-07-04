import firebaseConfig from '../firebase.config.json';
import paramsToSearch from '../utils/paramsToSearch';
import getToken from '../actions/getToken';

export interface IWriting {
    id: string;
    createdBy: string;
    title: string;
    content: string;
    createdOn: number;
    updatedOn: number;
}

type IDatabaseScheme = Record<string, { writings: Record<string, IWriting>; writingsUpdatedOn: number }>;

const dbProxyHandler: ProxyHandler<any> = {
    get(target, prop) {
        const path = `${target.path || ''}/${prop as string}`;
        const nextTarget = () => path;

        nextTarget.path = path;

        return new Proxy(nextTarget, dbProxyHandler);
    }
};

class DatabaseClass {
    readonly #databaseUrl: string;
    readonly #dbProxy: IDatabaseScheme;

    constructor({ databaseUrl }: { databaseUrl: string }) {
        this.#databaseUrl = databaseUrl;
        this.#dbProxy = new Proxy<IDatabaseScheme>({}, dbProxyHandler);
    }

    async get<Type>(getPath: (db: IDatabaseScheme) => Type): Promise<Type> {
        return window
            .fetch(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${this.#databaseUrl}${getPath(this.#dbProxy)()}.json${paramsToSearch({
                    auth: await getToken(),
                    print: 'pretty'
                })}`,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.json())
            .then((response) => {
                if (response?.error) {
                    throw response.error;
                }

                return response;
            });
    }

    async put<Type>(getPath: (db: IDatabaseScheme) => Type, data: Partial<Type>): Promise<void> {
        await window
            .fetch(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${this.#databaseUrl}${getPath(this.#dbProxy)()}.json${paramsToSearch({
                    auth: await getToken()
                })}`,
                { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
            )
            .then((response) => response.json())
            .then((response) => {
                if (response?.error) {
                    throw response.error;
                }

                return response;
            });
    }

    async delete<Type>(getPath: (db: IDatabaseScheme) => Type): Promise<void> {
        await window
            .fetch(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${this.#databaseUrl}${getPath(this.#dbProxy)()}.json${paramsToSearch({
                    auth: await getToken()
                })}`,
                { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.json())
            .then((response) => {
                if (response?.error) {
                    throw response.error;
                }

                return response;
            });
    }
}

const Database = new DatabaseClass(firebaseConfig);

export default Database;
