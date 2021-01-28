import writingsState, { IWriting } from '../store/states/writingsState';
import userState from '../store/states/userState';
import toUrl from '../utils/toUrl';
import toArray from '../utils/toArray';
import toObject from '../utils/toObject';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import FetchCache from '../classes/FetchCache';
import LocalStorage from '../classes/LocalStorage';

const fetchWritings = FetchCache.withCache(
    () => 'fetchWritings',
    async (): Promise<void> => {
        const indexedDBResult = toObject<IWriting>(
            (await IndexedDB.getAll<IWriting>(IndexedDB.paths.writings)) as IWriting[],
            'id'
        );

        writingsState(indexedDBResult);

        const writingsUpdatedOn =
            (await Database.get<number>(toUrl(Database.paths.writingsUpdatedOn, { userId: userState()?.localId }))) ||
            0;

        if (!writingsUpdatedOn) {
            await IndexedDB.clear(IndexedDB.paths.writings);

            writingsState({});

            return;
        }

        if (writingsUpdatedOn > (LocalStorage.get<number>(LocalStorage.paths.writingsUpdatedOn) || 0)) {
            const databaseResult =
                (await Database.get<Record<string, IWriting>>(
                    toUrl(Database.paths.writings, { userId: userState()?.localId })
                )) || {};

            await IndexedDB.putAll(IndexedDB.paths.writings, toArray(databaseResult));

            writingsState(databaseResult);
            LocalStorage.set(LocalStorage.paths.writingsUpdatedOn, Date.now());
        }
    }
);

export default fetchWritings;
