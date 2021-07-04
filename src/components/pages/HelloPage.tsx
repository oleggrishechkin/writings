import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import signInWithGoogle from '../../actions/signInWithGoogle';
import intlState from '../../store/states/intlState';
import SignInWithGoogleButton from '../SignInWithGoogleButton';
import LockIcon from '../../icons/LockIcon';

const HelloPage = (): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <>
            <div className="flex flex-auto flex-col items-center justify-center">
                <LockIcon className="dark:text-light-gray-2 h-12 mb-4 text-dark-gray-2 w-12" />
                <span className="mb-4 text-center">{formatMessage('hello')}</span>
                <span className="dark:text-light-gray-2 mb-8 text-center text-dark-gray-2 text-sm">
                    {formatMessage('signInPlease')}
                </span>
                <SignInWithGoogleButton onClick={() => signInWithGoogle()} />
            </div>
        </>
    );
};

export default HelloPage;
