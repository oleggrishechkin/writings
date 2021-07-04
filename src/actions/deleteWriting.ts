import writingsState from '../store/states/writingsState';
import remove from '../store/updaters/remove';
import Database from '../classes/Database';
import IndexedDB from '../classes/IndexedDB';
import putWritingsUpdatedOn from './putWritingsUpdatedOn';
import getLocalId from './getLocalId';

const deleteWriting = async (writingId: string): Promise<void> => {
    if (!writingId) {
        return;
    }

    writingsState(remove(writingId));

    await Database.delete((db) => db[getLocalId()].writings[writingId]);
    await putWritingsUpdatedOn();
    await IndexedDB.delete('writings', writingId);
};

export default deleteWriting;
