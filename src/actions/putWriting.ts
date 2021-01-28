import writingsState, { IWriting } from '../store/states/writingsState';
import add from '../store/updaters/add';
import userState from '../store/states/userState';
import toUrl from '../utils/toUrl';
import IndexedDB from '../classes/IndexedDB';
import Database from '../classes/Database';
import putWritingsUpdatedOn from './putWritingsUpdatedOn';

const putWriting = async (writingId: string, data: Partial<IWriting>): Promise<void> => {
    const localId = userState()?.localId;
    const writing = writingsState()[writingId];
    const extendedWriting: IWriting = {
        id: writingId,
        createdBy: localId as string,
        createdOn: Date.now(),
        title: '',
        content: '',
        ...(writing as IWriting | undefined),
        ...data,
        updatedOn: Date.now()
    };

    writingsState(add(writingId, extendedWriting));

    await Database.put(toUrl(Database.paths.writing, { userId: localId, writingId }), extendedWriting);
    await putWritingsUpdatedOn();
    await IndexedDB.put(IndexedDB.paths.writings, extendedWriting);
};

export default putWriting;
