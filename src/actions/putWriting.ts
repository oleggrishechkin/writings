import writingsState from '../store/states/writingsState';
import add from '../store/updaters/add';
import Database, { IWriting } from '../classes/Database';
import IndexedDB from '../classes/IndexedDB';
import putWritingsUpdatedOn from './putWritingsUpdatedOn';
import getLocalId from './getLocalId';

const putWriting = async (writingId: string, data: Partial<IWriting>): Promise<void> => {
    if (!writingId) {
        return;
    }

    const localId = getLocalId();
    const writing = writingsState()[writingId];
    const extendedWriting: IWriting = {
        id: writingId,
        createdBy: localId,
        createdOn: Date.now(),
        title: '',
        content: '',
        ...(writing as IWriting | undefined),
        ...data,
        updatedOn: Date.now()
    };

    writingsState(add(writingId, extendedWriting));

    await Database.put((db) => db[getLocalId()].writings[writingId], extendedWriting);
    await putWritingsUpdatedOn();
    await IndexedDB.put('writings', extendedWriting);
};

export default putWriting;
