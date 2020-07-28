import { createDependentEffect, createEffect, createSignal, onCleanup } from 'solid-js';

const createTransitionSignal = (openedSignal, duration) => {
    const [signal, setSignal] = createSignal(openedSignal() ? 'opened' : 'closed');
    let timeoutId;

    createDependentEffect(() => {
        if ((openedSignal() ? 'opened' : 'closed') !== signal()) {
            setSignal(openedSignal() ? 'opening' : 'closing');
        }
    }, [openedSignal]);
    createEffect(() => {
        switch (signal()) {
            case 'opening': {
                timeoutId = window.setTimeout(() => {
                    timeoutId = window.setTimeout(() => {
                        setSignal('open');
                    });
                });

                return;
            }
            case 'open': {
                timeoutId = window.setTimeout(() => {
                    setSignal('opened');
                }, duration);

                return;
            }
            case 'closing': {
                timeoutId = window.setTimeout(() => {
                    setSignal('close');
                });

                return;
            }
            case 'close': {
                timeoutId = window.setTimeout(() => {
                    setSignal('closed');
                }, duration);

                return;
            }
        }
    });
    onCleanup(() => window.clearTimeout(timeoutId));

    return signal;
};

export default createTransitionSignal;
