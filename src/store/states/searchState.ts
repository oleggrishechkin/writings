import { createState } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/search') || null;

const searchState = createState(getInitialState());

searchState``((search) => {
    LocalStorage.set('state/search', search);
});

resetEvent``(() => {
    searchState(getInitialState);
});

export default searchState;
