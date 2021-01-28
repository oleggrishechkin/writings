import writingsState, { IWriting } from '../store/states/writingsState';
import add from '../store/updaters/add';
import userState from '../store/states/userState';
import toUrl from '../utils/toUrl';
import remove from '../store/updaters/remove';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import FetchCache from '../classes/FetchCache';

const fetchWriting = FetchCache.withCache(
    (writingId: string) => `fetchWriting/${writingId}`,
    async (writingId: string): Promise<void> => {
        const indexedDBResult = (await IndexedDB.get<IWriting>(IndexedDB.paths.writings, writingId)) as IWriting;

        if (indexedDBResult) {
            writingsState(add(writingId, indexedDBResult));
        }

        const writingUpdatedOn =
            (await Database.get<number>(
                toUrl(Database.paths.writingUpdatedOn, { userId: userState()?.localId, writingId })
            )) || 0;

        if (!writingUpdatedOn) {
            await IndexedDB.delete(IndexedDB.paths.writings, writingId);

            writingsState(remove(writingId));

            return;
        }

        if (writingUpdatedOn > (writingsState()[writingId]?.updatedOn || 0)) {
            const databaseResult = await Database.get<IWriting>(
                toUrl(Database.paths.writing, { userId: userState()?.localId, writingId })
            );

            await IndexedDB.put(IndexedDB.paths.writings, databaseResult);

            writingsState(add(writingId, databaseResult));
        }
    }
);

export default fetchWriting;
