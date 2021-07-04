import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import combine from '../utils/combine';
import shareWriting from '../actions/shareWriting';
import IosShareIcon from '../icons/IosShareIcon';
import Router from '../classes/Router';
import deleteWriting from '../actions/deleteWriting';
import DeleteOutlineIcon from '../icons/DeleteOutlineIcon';
import { IWriting } from '../classes/Database';
import intlState from '../store/states/intlState';
import ActionButton from './ActionButton';
import ActionsGroup from './ActionsGroup';

interface IProps {
    writing?: IWriting;
    onClose: () => void;
}

const WritingActions = ({ writing, onClose }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <ActionsGroup className="mb-2">
            {!!writing && (
                <ActionButton onClick={combine(onClose, () => shareWriting(writing?.id))}>
                    <span className="flex-auto">{formatMessage('share')}</span>
                    <IosShareIcon />
                </ActionButton>
            )}
            <ActionButton
                onClick={() => {
                    onClose();
                    Router.replace('/');

                    if (writing) {
                        deleteWriting(writing?.id);
                    }
                }}
            >
                <span className="flex-auto">{formatMessage('remove')}</span>
                <DeleteOutlineIcon />
            </ActionButton>
        </ActionsGroup>
    );
};

export default WritingActions;
