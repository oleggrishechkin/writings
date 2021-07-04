import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    children: any;
    onClick?: MouseEventHandler;
}

const PrimaryButton = ({ className, children, onClick }: IProps): ReactElement => (
    <button
        className={cx(
            className,
            'active:opacity-50 bg-light-gray-6 dark:bg-dark-gray-6 duration-300 flex items-center justify-center min-w-[75%] p-4 rounded-xl shadow-xl transition-opacity'
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

PrimaryButton.defaultProps = {
    type: 'button'
};

export default PrimaryButton;
