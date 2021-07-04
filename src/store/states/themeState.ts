import { createState, createEffect } from 'react-tagged-state';
import resetEvent from '../events/resetEvent';
import LocalStorage from '../../classes/LocalStorage';

const getInitialState = () => LocalStorage.get('state/theme') || null;

const themeState = createState(getInitialState());

createEffect(() => {
    if (
        themeState() === 'dark' ||
        (themeState() === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');

        return;
    }

    document.documentElement.classList.remove('dark');
});

themeState``((theme) => {
    LocalStorage.set('state/theme', theme);
});

resetEvent``(() => {
    themeState(getInitialState);
});

export default themeState;
