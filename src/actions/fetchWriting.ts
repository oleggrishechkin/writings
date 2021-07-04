import writingsState from '../store/states/writingsState';
import add from '../store/updaters/add';
import remove from '../store/updaters/remove';
import withCache from '../utils/withCache';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import getLocalId from './getLocalId';

const fetchWriting = withCache(
    (writingId: string) => `fetchWriting/${writingId}`,
    async (writingId: string): Promise<void> => {
        if (!writingId) {
            return;
        }

        const indexedDBResult = await IndexedDB.get('writings', writingId);

        if (indexedDBResult) {
            writingsState(add(writingId, indexedDBResult));
        }

        const writingUpdatedOn = (await Database.get((db) => db[getLocalId()].writings[writingId].updatedOn)) || 0;

        if (!writingUpdatedOn) {
            await IndexedDB.delete('writings', writingId);

            writingsState(remove(writingId));

            return;
        }

        if (writingUpdatedOn > (writingsState()[writingId]?.updatedOn || 0)) {
            const databaseResult = await Database.get((db) => db[getLocalId()].writings[writingId]);

            await IndexedDB.put('writings', databaseResult);

            writingsState(add(writingId, databaseResult));
        }
    }
);

export default fetchWriting;
