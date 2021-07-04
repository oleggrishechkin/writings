import userState from '../states/userState';
import searchState from '../states/searchState';
import isWordIncludesSearch from '../../utils/isWordIncludesSearch';
import sortedWritings from '../computed/sortedWritings';
import { IWriting } from '../../classes/Database';

const filteredWritingsSelector = (): IWriting[] => {
    const search = searchState();
    const localId = userState()?.localId;

    return sortedWritings().filter((item) => isWordIncludesSearch(item.content, search) && item.createdBy === localId);
};

export default filteredWritingsSelector;
