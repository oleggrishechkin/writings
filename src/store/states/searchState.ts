import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

export type TSearch = null | string;

const getInitialState = (): TSearch => LocalStorage.get(LocalStorage.paths.search) || null;

const searchState = createState<TSearch>(getInitialState());

searchState``((search) => {
    LocalStorage.set(LocalStorage.paths.search, search);
});

resetEvent``(() => {
    searchState(getInitialState);
});

export default searchState;
