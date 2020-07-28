import { createSignal, onCleanup } from 'solid-js';
import fetchWriting from '../actions/fetchWriting';
import IndexedDB from '../proxies/IndexedDB';

const createWritingSignal = (localId, writingId) => {
    const [signal, setSignal] = createSignal(null);

    fetchWriting(localId, writingId).then((result) => {
        setSignal(result);
    });

    const unsubscribe = IndexedDB.on('writings', writingId, (key, data) => {
        if (!key) {
            return setSignal(data.find(({ id }) => id === writingId) || null);
        }

        return setSignal(data || null);
    });

    onCleanup(() => unsubscribe());

    return signal;
};

export default createWritingSignal;
