import { createComputed } from 'react-tagged-state';
import toArray from '../utils/toArray';
import writingsState from '../states/writingsState';

const sortedWritings = createComputed(() => toArray(writingsState()).sort((a, b) => a._updatedOn - b._updatedOn));

export default sortedWritings;
