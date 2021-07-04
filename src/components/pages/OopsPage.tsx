import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import intlState from '../../store/states/intlState';
import AutorenewIcon from '../../icons/AutorenewIcon';
import PrimaryButton from '../PrimaryButton';
import ErrorIcon from '../../icons/ErrorIcon';

const OopsPage = (): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <>
            <div className="flex flex-auto flex-col items-center justify-center">
                <ErrorIcon className="dark:text-light-gray-2 h-12 mb-4 text-dark-gray-2 w-12" />
                <span className="mb-4 text-center">{formatMessage('oops')}</span>
                <span className="dark:text-light-gray-2 mb-8 text-center text-dark-gray-2 text-sm">
                    {formatMessage('somethingBadHappened')}
                </span>
                <PrimaryButton onClick={() => document.location.reload(true)}>
                    <AutorenewIcon className="mr-2" />
                    {formatMessage('reload')}
                </PrimaryButton>
            </div>
        </>
    );
};

export default OopsPage;
