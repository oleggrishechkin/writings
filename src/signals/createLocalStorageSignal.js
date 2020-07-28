import { createSignal, onCleanup } from 'solid-js';
import LocalStorage from '../proxies/LocalStorage';

const createLocalStorageSignal = (key, getData = (data) => data) => {
    const [signal, setSignal] = createSignal(getData(LocalStorage.getItem(key)));
    const unsubscribe = LocalStorage.on(key, (data) => {
        setSignal(getData(data));
    });

    onCleanup(() => unsubscribe());

    return signal;
};

export default createLocalStorageSignal;
