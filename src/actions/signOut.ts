import resetEvent from '../store/events/resetEvent';
import LocalStorage from '../classes/LocalStorage';
import withCache from '../utils/withCache';
import IndexedDB from '../classes/IndexedDB';

const signOut = async (): Promise<void> => {
    await IndexedDB.clearAll();

    withCache.clear();
    LocalStorage.clear();
    resetEvent();
};

export default signOut;
