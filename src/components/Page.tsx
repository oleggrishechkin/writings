import React, { ReactElement } from 'react';
import cx from 'clsx';
import useTransition from '../hooks/useTransition';

interface IProps {
    opened?: boolean;
    root?: boolean;
    children: any;
}

const Page = ({ opened, root, children }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);

    return (
        <>
            {transition !== 'closed' && (
                <div className="absolute flex flex-col h-full left-0 top-0 w-full z-10">
                    <div
                        className={cx(
                            'bg-white dark:bg-dark-gray-4 duration-300 flex flex-auto flex-col overflow-auto px-4 py-8 shadow-l-xl transform-gpu transition-transform',
                            !root && !['opening', 'opened'].includes(transition) && 'translate-x-full'
                        )}
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
