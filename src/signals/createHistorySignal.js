import { createSignal, onCleanup } from 'solid-js';
import History from '../proxies/History';

const createHistorySignal = (getData = () => {}) => {
    const [signal, setSignal] = createSignal(getData());
    const unsubscribe = History.on(() => {
        setSignal(getData());
    });

    onCleanup(() => unsubscribe());

    return signal;
};

export default createHistorySignal;
