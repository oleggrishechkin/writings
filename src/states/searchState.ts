import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import localStorageKeys from '../constants/localStorageKeys';
import setLocalStorageItem from '../utils/setLocalStorageItem';

export type TSearch = null | string;

const getInitialState = (): TSearch => getLocalStorageItem(localStorageKeys.search) || null;

const searchState = createState<TSearch>(getInitialState());

searchState``((search) => {
    setLocalStorageItem(localStorageKeys.search, search);
});

resetEvent``(() => {
    searchState(getInitialState);
});

export default searchState;
