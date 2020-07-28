import IndexedDB from '../proxies/IndexedDB';
import deleteData from './deleteData';

const deleteWriting = async (localId, writingId) => {
    const indexedDBResult = await IndexedDB.delete('writings', writingId);

    deleteData(`/writings/${localId}/${writingId}`);

    return indexedDBResult;
};

export default deleteWriting;
