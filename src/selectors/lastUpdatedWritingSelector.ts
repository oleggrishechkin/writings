import { IWriting } from '../states/writingsState';
import sortedWritings from '../computed/sortedWritings';

const lastUpdatedWritingSelector = (): IWriting | undefined => {
    const writings = sortedWritings();

    return writings[writings.length - 1];
};

export default lastUpdatedWritingSelector;
