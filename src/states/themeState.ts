import { createState, createEffect } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import localStorageKeys from '../constants/localStorageKeys';
import setLocalStorageItem from '../utils/setLocalStorageItem';

export type TTheme = null | 'light' | 'dark';

const getInitialState = (): TTheme => getLocalStorageItem(localStorageKeys.theme) || null;

const themeState = createState<TTheme>(getInitialState());

createEffect(() => {
    document.documentElement.dataset.theme = themeState() || 'system';
});

themeState``((theme) => {
    setLocalStorageItem(localStorageKeys.theme, theme);
});

resetEvent``(() => {
    themeState(getInitialState);
});

export default themeState;
