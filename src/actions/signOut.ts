import resetEvent from '../store/events/resetEvent';
import IndexedDB from '../classes/IndexedDB';
import FetchCache from '../classes/FetchCache';
import LocalStorage from '../classes/LocalStorage';

const signOut = async (): Promise<void> => {
    await IndexedDB.clearAll();

    FetchCache.clear();
    LocalStorage.clear();
    resetEvent();
};

export default signOut;
