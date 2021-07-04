import writingsState from '../store/states/writingsState';
import objectToArray from '../utils/objectToArray';
import arrayToObject from '../utils/arrayToObject';
import LocalStorage from '../classes/LocalStorage';
import withCache from '../utils/withCache';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import getLocalId from './getLocalId';

const fetchWritings = withCache(
    () => 'fetchWritings',
    async (): Promise<void> => {
        const indexedDBResult = arrayToObject(await IndexedDB.getAll('writings'), 'id');

        writingsState(indexedDBResult);

        const writingsUpdatedOn = (await Database.get((db) => db[getLocalId()].writingsUpdatedOn)) || 0;

        if (!writingsUpdatedOn) {
            await IndexedDB.clear('writings');

            writingsState({});

            return;
        }

        if (writingsUpdatedOn > (LocalStorage.get('writingsUpdatedOn') || 0)) {
            const databaseResult = (await Database.get((db) => db[getLocalId()].writings)) || {};

            await IndexedDB.putAll('writings', objectToArray(databaseResult));

            writingsState(databaseResult);
            LocalStorage.set('writingsUpdatedOn', Date.now());
        }
    }
);

export default fetchWritings;
