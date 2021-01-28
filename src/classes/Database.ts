import config from '../config';
import toSearch from '../utils/toSearch';
import getToken from '../actions/getToken';

class IDatabase {
    readonly #databaseUrl: string;
    readonly paths = {
        writings: '/:userId/writings',
        writingsUpdatedOn: '/:userId/writingsUpdatedOn',
        writing: '/:userId/writings/:writingId',
        writingUpdatedOn: '/:userId/writings/:writingId/updatedOn'
    };

    constructor({ databaseUrl }: { databaseUrl: string }) {
        this.#databaseUrl = databaseUrl;
    }

    static postFetch(response: Response) {
        return response.json().then((response) => {
            if (response?.error) {
                throw response.error;
            }

            return response;
        });
    }

    async get<Type>(url: string): Promise<Type> {
        return window
            .fetch(
                `${this.#databaseUrl}${url}.json${toSearch({
                    auth: await getToken(),
                    print: 'pretty'
                })}`,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(IDatabase.postFetch);
    }

    async put<Type>(url: string, data: Partial<Type>): Promise<void> {
        await window
            .fetch(
                `${this.#databaseUrl}${url}.json${toSearch({
                    auth: await getToken()
                })}`,
                { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
            )
            .then(IDatabase.postFetch);
    }

    async delete(url: string): Promise<void> {
        await window
            .fetch(
                `${this.#databaseUrl}${url}.json${toSearch({
                    auth: await getToken()
                })}`,
                { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
            )
            .then(IDatabase.postFetch);
    }
}

const Database = new IDatabase(config.firebase);

export default Database;
