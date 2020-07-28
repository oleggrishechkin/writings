import IndexedDB from '../proxies/IndexedDB';
import putData from './putData';

const putWriting = async (localId, writingId, data) => {
    const writing = await IndexedDB.get('writings', writingId);
    const extendedWriting = {
        id: writingId,
        _createdBy: localId,
        _createdOn: Date.now(),
        ...writing,
        ...data,
        _updatedOn: Date.now()
    };
    const indexedDBResult = await IndexedDB.put('writings', extendedWriting);

    putData(`/writings/${localId}/${writingId}`, extendedWriting);

    return indexedDBResult;
};

export default putWriting;
