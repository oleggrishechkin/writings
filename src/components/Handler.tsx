import React, { ReactElement, TouchEventHandler } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    onClose: () => void;
    onTouchStart: TouchEventHandler;
}

const Handler = ({ className, onClose, onTouchStart }: IProps): ReactElement => (
    <div
        className={cx(
            className,
            'before:bg-black before:bg-opacity-50 before:h-0.5 before:rounded-full before:w-1/2 dark:before:bg-opacity-50 dark:before:bg-white flex justify-center py-4 touch-action-none'
        )}
        onClick={onClose}
        onTouchStart={onTouchStart}
    />
);

export default Handler;
