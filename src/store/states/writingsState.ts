import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';

export interface IWriting {
    id: string;
    createdBy: string;
    title: string;
    content: string;
    createdOn: number;
    updatedOn: number;
}

const initialState = {};

const writingsState = createState<Record<string, IWriting>>(initialState);

resetEvent``(() => {
    writingsState(initialState);
});

export default writingsState;
