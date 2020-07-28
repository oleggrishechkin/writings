import IndexedDB from '../proxies/IndexedDB';
import LocalStorage from '../proxies/LocalStorage';

const signOut = async () => {
    LocalStorage.removeItem('scroll');
    LocalStorage.removeItem('search');
    await IndexedDB.clear('writings');
    LocalStorage.removeItem('user');
};

export default signOut;
