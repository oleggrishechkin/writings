import React, { MouseEventHandler, ReactElement } from 'react';
import cx from 'clsx';
import { useSelector } from 'react-tagged-state';
import useTransition from '../hooks/useTransition';
import useOutsideClick from '../hooks/useOutsideClick';
import intlState from '../store/states/intlState';
import Portal from './Portal';
import ActionsGroup from './ActionsGroup';
import ActionButton from './ActionButton';

interface IProps {
    opened?: boolean;
    onClose: () => void;
    children: any;
    onMouseDown?: MouseEventHandler;
}

const Menu = ({ opened, children, onClose, onMouseDown }: IProps): ReactElement => {
    const transition = useTransition(!!opened, 300);
    const ref = useOutsideClick<HTMLDivElement>(onClose);
    const { formatMessage } = useSelector(intlState);

    return (
        <Portal opened={transition !== 'closed'}>
            <div
                className="absolute flex flex-col h-screen justify-end left-0 top-0 w-full z-10"
                onMouseDown={onMouseDown}
            >
                <div
                    ref={ref}
                    className={cx(
                        'duration-300 flex flex-col max-h-full overflow-auto px-2 py-4 transform-gpu transition-transform',
                        !['opening', 'opened'].includes(transition) && 'translate-y-full'
                    )}
                >
                    {children}
                    <ActionsGroup className="mt-2">
                        <ActionButton onClick={onClose}>{formatMessage('cancel')}</ActionButton>
                    </ActionsGroup>
                </div>
            </div>
        </Portal>
    );
};

export default Menu;
