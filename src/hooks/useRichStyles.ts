import { useState, useEffect } from 'react';
import shallowEqual from '../utils/shallowEqual';
import RichUtils from '../classes/RichUtils';

const useRichStyles = (): typeof RichUtils.styles => {
    const [state, setState] = useState(() => RichUtils.styles);

    useEffect(() => {
        let frameId: number;
        const frame = () => {
            frameId = window.requestAnimationFrame(frame);
            setState((prevState) => {
                const nextState = RichUtils.styles;

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

export default useRichStyles;
