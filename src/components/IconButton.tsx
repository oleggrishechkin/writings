import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    'aria-label'?: string;
    className?: string;
    children: any;
    onMouseDown?: MouseEventHandler;
    onClick?: MouseEventHandler;
}

const IconButton = ({ 'aria-label': ariaLabel, className, children, onMouseDown, onClick }: IProps): ReactElement => (
    <button
        aria-label={ariaLabel}
        onClick={onClick}
        className={cx(
            className,
            'active:opacity-50 before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:h-full before:left-1/2 before:min-h-[3rem] before:min-w-[3rem] before:top-1/2 before:w-full duration-300 flex items-center justify-center relative transition-opacity'
        )}
        onMouseDown={onMouseDown}
    >
        {children}
    </button>
);

IconButton.defaultProps = {
    type: 'button'
};

export default IconButton;
