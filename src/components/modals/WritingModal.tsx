import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import intlState from '../../store/states/intlState';
import ActionButton from '../ActionButton';
import ActionsGroup from '../ActionsGroup';
import combine from '../../utils/combine';
import { IWriting } from '../../classes/Database';
import putWriting from '../../actions/putWriting';
import shareWriting from '../../actions/shareWriting';
import IosShareIcon from '../../icons/IosShareIcon';
import Router from '../../classes/Router';
import deleteWriting from '../../actions/deleteWriting';
import DeleteOutlineIcon from '../../icons/DeleteOutlineIcon';
import ToggledDate from '../ToggledDate';
import EditIcon from '../../icons/EditIcon';

interface IProps {
    writingId: string;
    writing?: IWriting;
    onClose: () => void;
}

const WritingModal = ({ writingId, writing, onClose }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <span className="mb-4 truncate">{writing?.title || formatMessage('noTitle')}</span>
                <ToggledDate createdOn={writing?.createdOn} updatedOn={writing?.updatedOn} />
            </div>
            <ActionsGroup className="flex-shrink-0">
                <ActionButton
                    onClick={combine(() => {
                        const result = prompt(formatMessage('saveAs'), writing?.title);

                        if (typeof result === 'string' && result !== (writing?.title || '')) {
                            onClose();
                            putWriting(writingId, { title: result });
                        }
                    })}
                >
                    <span className="flex-auto">{formatMessage('saveAs')}</span>
                    <EditIcon />
                </ActionButton>
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
        </>
    );
};

export default WritingModal;
