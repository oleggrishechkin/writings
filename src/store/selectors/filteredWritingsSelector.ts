import { IWriting } from '../states/writingsState';
import userState from '../states/userState';
import searchState from '../states/searchState';
import includes from '../../utils/includes';
import sortedWritings from '../computed/sortedWritings';

const filteredWritingsSelector = (): IWriting[] => {
    const search = searchState();
    const localId = userState()?.localId;

    return sortedWritings().filter((item) => includes(item.content, search) && item.createdBy === localId);
};

export default filteredWritingsSelector;
