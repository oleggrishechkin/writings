import { createSignal, onCleanup } from 'solid-js';
import { getSelectionStyles } from '../components/Editor/utils';

const createSelectionStylesSignal = () => {
    const [signal, setSignal] = createSignal({});
    let animationId;
    const step = () => {
        const nextStyles = getSelectionStyles();
        const currentStyles = signal();

        if (Object.keys(nextStyles).some((key) => nextStyles[key] !== currentStyles[key])) {
            setSignal(nextStyles);
        }

        animationId = requestAnimationFrame(step);
    };

    step();

    onCleanup(() => window.cancelAnimationFrame(animationId));

    return signal;
};

export default createSelectionStylesSignal;
