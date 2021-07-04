import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    children: any;
    onClick?: MouseEventHandler;
}

const ActionButton = ({ className, children, onClick }: IProps): ReactElement => (
    <button
        className={cx(
            className,
            'active:opacity-50 bg-light-gray-6 dark:bg-dark-gray-6 duration-300 flex items-center p-4 text-left transition-opacity'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

export default ActionButton;
