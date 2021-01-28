import { useState, useEffect } from 'react';
import getFormatting, { IFormatting } from '../utils/getFormatting';
import shallowEqual from '../utils/shallowEqual';

const useFormatting = (): IFormatting => {
    const [state, setState] = useState(getFormatting);

    useEffect(() => {
        let frameId: number;
        const frame = () => {
            frameId = window.requestAnimationFrame(frame);
            setState((prevState) => {
                const nextState = getFormatting();

                if (shallowEqual(nextState, prevState)) {
                    return prevState;
                }

                return nextState;
            });
        };

        frame();

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return state;
};

export default useFormatting;
