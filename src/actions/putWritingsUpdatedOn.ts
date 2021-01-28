import toUrl from '../utils/toUrl';
import userState from '../store/states/userState';
import Database from '../classes/Database';
import LocalStorage from '../classes/LocalStorage';

const putWritingsUpdatedOn = async (): Promise<void> => {
    const updatedOn = Date.now();

    LocalStorage.set(LocalStorage.paths.writingsUpdatedOn, updatedOn);

    await Database.put(toUrl(Database.paths.writingsUpdatedOn, { userId: userState()?.localId }), updatedOn);
};

export default putWritingsUpdatedOn;
