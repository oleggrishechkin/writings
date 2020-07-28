import { createSignal, onCleanup } from 'solid-js';
import fetchWritings from '../actions/fetchWritings';
import IndexedDB from '../proxies/IndexedDB';

const createWritingsSignal = (localId) => {
    const [signal, setSignal] = createSignal([]);

    fetchWritings(localId).then((result) => {
        setSignal(result);
    });

    const unsubscribe = IndexedDB.on('writings', null, (key, data) => {
        if (!key) {
            return setSignal(data);
        }

        if (!data) {
            return setSignal(signal().filter(({ id }) => id !== key));
        }

        return setSignal(signal().map((writing) => (writing.id === key ? data : writing)));
    });

    onCleanup(() => unsubscribe());

    return signal;
};

export default createWritingsSignal;
