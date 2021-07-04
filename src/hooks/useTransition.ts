import { useEffect, useState } from 'react';

type ITransition = 'open' | 'opening' | 'opened' | 'close' | 'closing' | 'closed';

const useTransition = (opened: boolean, duration: number): ITransition => {
    const [state, setState] = useState<ITransition>(opened ? 'opened' : 'closed');

    useEffect(
        () => () => {
            setState(opened ? 'close' : 'open');
        },
        [opened]
    );
    useEffect(() => {
        let timeoutId: any;

        switch (state) {
            case 'open': {
                timeoutId = setTimeout(() => {
                    setState('opening');
                });

                break;
            }
            case 'opening': {
                timeoutId = setTimeout(() => {
                    setState('opened');
                }, duration);

                break;
            }
            case 'close': {
                timeoutId = setTimeout(() => {
                    setState('closing');
                });

                break;
            }
            case 'closing': {
                timeoutId = setTimeout(() => {
                    setState('closed');
                }, duration);
            }
        }

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return state;
};

export default useTransition;
