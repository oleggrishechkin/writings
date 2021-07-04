import React, { ReactElement } from 'react';
import cx from 'clsx';
import useTransition from '../hooks/useTransition';
import Portal from './Portal';

interface IProps {
    className?: string;
    opened?: boolean;
    children: any;
}

const CornerAction = ({ opened, className, children }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);

    return (
        <Portal opened={transition !== 'closed'}>
            <div
                className={cx(
                    className,
                    'absolute bottom-4 duration-300 fixed items-stretch right-4 transition-opacity z-10',
                    !['opening', 'opened'].includes(transition) && 'opacity-0'
                )}
            >
                {children}
            </div>
        </Portal>
    );
};

export default CornerAction;
