import React, { ReactElement } from 'react';
import cx from 'clsx';

interface IProps {
    className?: string;
    horizontal?: boolean;
    children: any;
}

const ActionsGroup = ({ className, horizontal, children }: IProps): ReactElement => (
    <div
        className={cx(
            className,
            'dark:divide-dark-gray-5 divide-light-gray-5 divide-solid flex shadow-xl z-10',
            horizontal ? 'divide-x divide-y-0' : 'flex-col divide-y divide-x-0 rounded-xl overflow-hidden'
        )}
    >
        {children}
    </div>
);

export default ActionsGroup;
