import { createState, createEffect } from 'react-tagged-state';
import getBrowserLang from '../../utils/getBrowserLang';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/lang') || null;

const langState = createState(getInitialState());

createEffect(() => {
    document.documentElement.lang = getBrowserLang(langState());
});

langState``((lang) => {
    LocalStorage.set('state/lang', lang);
});

resetEvent``(() => {
    langState(getInitialState);
});

export default langState;
