import IndexedDB from '../proxies/IndexedDB';
import fetchData from './fetchData';

const synced = new Set();
const fetchWriting = async (localId, writingId) => {
    const indexedDBResult = await IndexedDB.get('writings', writingId);

    if (!synced.has(writingId)) {
        synced.add(writingId);

        fetchData(`/writings/${localId}/${writingId}`).then((result) => {
            if (result) {
                IndexedDB.put('writings', result);
            }
        });
    }

    return indexedDBResult;
};

export default fetchWriting;
