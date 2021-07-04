import LocalStorage from '../classes/LocalStorage';
import Database from '../classes/Database';
import getLocalId from './getLocalId';

const putWritingsUpdatedOn = async (): Promise<void> => {
    const updatedOn = Date.now();

    LocalStorage.set('writingsUpdatedOn', updatedOn);

    await Database.put((db) => db[getLocalId()].writingsUpdatedOn, updatedOn);
};

export default putWritingsUpdatedOn;
