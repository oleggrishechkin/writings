import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import intlState from '../store/states/intlState';
import { IWriting } from '../classes/Database';
import Link from './Link';

interface IProps {
    className?: string;
    writing: IWriting;
}

const Writing = ({ className, writing }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <Link
            className={cx(
                className,
                'active:opacity-50 duration-300 flex flex-col items-center p-2 transition-opacity'
            )}
            href={`/writings/${writing.id}`}
        >
            <div className="bg-white flex flex-col h-20 leading-none mb-4 px-2 py-2 relative rounded-lg shadow-xl text-[0.2rem] text-black w-16">
                <div
                    className="flex-auto overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: writing.content.slice(0, 1000) }}
                />
            </div>
            <span className="max-w-full truncate">{writing.title || formatMessage('noTitle')}</span>
        </Link>
    );
};

export default Writing;
