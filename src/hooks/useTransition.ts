import { useState, useEffect, useRef } from 'react';

export type TTransition = 'open' | 'opening' | 'opened' | 'close' | 'closing' | 'closed';

const useTransition = (opened: boolean, duration: number): TTransition => {
    const [state, setState] = useState<TTransition>(() => (opened ? 'opened' : 'closed'));
    const durationRef = useRef(duration);

    durationRef.current = duration;

    useEffect(() => {
        setState((prevState) => {
            if ((opened ? 'opened' : 'closed') === prevState) {
                return prevState;
            }

            return opened ? 'opening' : 'closing';
        });
    }, [opened]);
    useEffect(() => {
        let timeoutId: number;

        switch (state) {
            case 'opening': {
                timeoutId = window.setTimeout(() => {
                    setState('open');
                });

                return;
            }
            case 'open': {
                timeoutId = window.setTimeout(() => {
                    setState('opened');
                }, durationRef.current);

                return;
            }
            case 'closing': {
                timeoutId = window.setTimeout(() => {
                    setState('close');
                });

                return;
            }
            case 'close': {
                timeoutId = window.setTimeout(() => {
                    setState('closed');
                }, durationRef.current);

                return;
            }
        }

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [state]);

    return state;
};

export default useTransition;
