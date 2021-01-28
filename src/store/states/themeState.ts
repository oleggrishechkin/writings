import { createState, createEffect } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

export type TTheme = null | 'light' | 'dark';

const getInitialState = (): TTheme => LocalStorage.get(LocalStorage.paths.theme) || null;

const themeState = createState<TTheme>(getInitialState());

createEffect(() => {
    document.documentElement.dataset.theme = themeState() || 'system';
});

themeState``((theme) => {
    LocalStorage.set(LocalStorage.paths.theme, theme);
});

resetEvent``(() => {
    themeState(getInitialState);
});

export default themeState;
