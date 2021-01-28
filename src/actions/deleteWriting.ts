import writingsState from '../store/states/writingsState';
import remove from '../store/updaters/remove';
import userState from '../store/states/userState';
import toUrl from '../utils/toUrl';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import putWritingsUpdatedOn from './putWritingsUpdatedOn';

const deleteWriting = async (writingId: string): Promise<void> => {
    writingsState(remove(writingId));

    await Database.delete(toUrl(Database.paths.writing, { userId: userState()?.localId, writingId }));
    await putWritingsUpdatedOn();
    await IndexedDB.delete(IndexedDB.paths.writings, writingId);
};

export default deleteWriting;
