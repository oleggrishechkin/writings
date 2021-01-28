import { createComputed } from 'react-tagged-state';
import toArray from '../../utils/toArray';
import writingsState from '../states/writingsState';

const sortedWritings = createComputed(() => toArray(writingsState()).sort((a, b) => a.updatedOn - b.updatedOn));

export default sortedWritings;
