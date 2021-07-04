import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import intlState from '../store/states/intlState';
import SearchIcon from '../icons/SearchIcon';

interface IProps {
    className?: string;
}

const NotFound = ({ className }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <div
            className={cx(
                className,
                'dark:text-light-gray-2 flex flex-auto flex-col items-center justify-center text-dark-gray-2'
            )}
        >
            <SearchIcon className="h-12 mb-4 w-12" />
            <span className="text-center text-sm">{formatMessage('notFound')}</span>
        </div>
    );
};

export default NotFound;
