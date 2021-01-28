import { createState, createEffect } from 'react-tagged-state';
import getBrowserLang, { TBrowserLang } from '../../utils/getBrowserLang';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

export type TLang = null | TBrowserLang;

const getInitialState = (): TLang => LocalStorage.get(LocalStorage.paths.lang) || null;

const langState = createState<TLang>(getInitialState());

createEffect(() => {
    document.documentElement.lang = getBrowserLang(langState());
});

langState``((lang) => {
    LocalStorage.set(LocalStorage.paths.lang, lang);
});

resetEvent``(() => {
    langState(getInitialState);
});

export default langState;
