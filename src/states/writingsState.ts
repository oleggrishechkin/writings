import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';

export interface IWriting {
    id: string;
    _createdBy: string;
    title: string;
    content: string;
    _createdOn: number;
    _updatedOn: number;
}

const initialState = {};

const writingsState = createState<Record<string, IWriting>>(initialState);

resetEvent``(() => {
    writingsState(initialState);
});

export default writingsState;
