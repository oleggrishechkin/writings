import { createState, createEffect } from 'react-tagged-state';
import getBrowserLang, { TBrowserLang } from '../utils/getBrowserLang';
import resetEvent from '../events/resetEvent';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import localStorageKeys from '../constants/localStorageKeys';
import setLocalStorageItem from '../utils/setLocalStorageItem';

export type TLang = null | TBrowserLang;

const getInitialState = (): TLang => getLocalStorageItem(localStorageKeys.lang) || null;

const langState = createState<TLang>(getInitialState());

createEffect(() => {
    document.documentElement.lang = getBrowserLang(langState());
});

langState``((lang) => {
    setLocalStorageItem(localStorageKeys.lang, lang);
});

resetEvent``(() => {
    langState(getInitialState);
});

export default langState;
