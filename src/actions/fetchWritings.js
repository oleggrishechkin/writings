import IndexedDB from '../proxies/IndexedDB';
import fetchData from './fetchData';

let synced = false;
const fetchWritings = async (localId) => {
    const indexedDBResult = await IndexedDB.getAll('writings');

    if (!synced) {
        synced = true;

        fetchData(`/writings/${localId}`).then((result) => {
            IndexedDB.putAll(
                'writings',
                Object.keys(result).map((key) => result[key])
            );
        });
    }

    return indexedDBResult;
};

export default fetchWritings;
