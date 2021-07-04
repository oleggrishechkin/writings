import React, { ReactElement } from 'react';
import cx from 'clsx';
import useTransition from '../hooks/useTransition';
import useOutsideClick from '../hooks/useOutsideClick';
import useSlideDown from '../hooks/useSlideDown';
import Portal from './Portal';
import Handler from './Handler';

interface IProps {
    opened?: boolean;
    onClose: () => void;
    children: any;
}

const Modal = ({ opened, children, onClose }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);
    const ref = useOutsideClick<HTMLDivElement>(onClose);
    const { onTouchStart, dragging, diff } = useSlideDown(onClose);

    return (
        <Portal opened={transition !== 'closed'}>
            <div
                className="absolute flex flex-col h-screen justify-end left-0 top-0 w-full z-10"
                onTouchStart={() => {}}
            >
                <div
                    ref={ref}
                    className={cx(
                        'bg-white dark:bg-dark-gray-4 duration-300 flex flex-col max-h-[calc(100%-2rem)] overflow-auto pb-8 px-4 rounded-t-3xl shadow-t-xl transform-gpu transition-transform',
                        !['opening', 'opened'].includes(transition) && 'translate-y-full',
                        dragging && 'transition-none'
                    )}
                    style={diff > 0 ? { transform: `translate3d(0, ${diff}px, 0)` } : undefined}
                >
                    <Handler className="mb-8 sticky top-0 z-10" onClose={onClose} onTouchStart={onTouchStart} />
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
