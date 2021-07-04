import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import intlState from '../store/states/intlState';

interface IProps {
    className?: string;
    createdOn?: number;
    updatedOn?: number;
}

const ToggledDate = ({ className, createdOn = Date.now(), updatedOn = Date.now() }: IProps): ReactElement => {
    const [isCreated, setIsCreated] = useState<null | boolean>(null);
    const { formatMessage, formatDate } = useSelector(intlState);

    return (
        <span
            className={cx(className, 'dark:text-light-gray-2 text-dark-gray-2 text-xs')}
            onClick={() => setIsCreated((currentIsCreated) => !currentIsCreated)}
        >
            {`${isCreated === null ? '' : `${formatMessage(isCreated ? 'created' : 'edited')}: `}${formatDate(
                isCreated ? createdOn : updatedOn
            )}`}
        </span>
    );
};

export default ToggledDate;
