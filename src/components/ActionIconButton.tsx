import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    'aria-label'?: string;
    className?: string;
    children: any;
    active?: boolean;
    onClick?: MouseEventHandler;
}

const ActionIconButton = ({ 'aria-label': ariaLabel, className, children, active, onClick }: IProps): ReactElement => (
    <button
        aria-label={ariaLabel}
        className={cx(
            className,
            'active:opacity-50 bg-light-gray-6 dark:bg-dark-gray-6 duration-300 flex items-center justify-center p-4 transition-opacity',
            !!active && 'text-light-blue dark:text-dark-blue'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

export default ActionIconButton;
