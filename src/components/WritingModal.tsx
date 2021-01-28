import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import { ReactComponent as CancelOutlineIcon } from '../icons/cancel_outlile-24px.svg';
import intlState from '../store/states/intlState';
import { IWriting } from '../store/states/writingsState';
import shareWriting from '../actions/shareWriting';
import deleteWriting from '../actions/deleteWriting';
import putWriting from '../actions/putWriting';
import Router from '../classes/Router';
import useMenu from '../hooks/useMenu';
import Content from './Content';
import Header from './Header';
import IconButton from './IconButton';
import SettingsButton from './SettingsButton';
import SettingsGroup from './SettingsGroup';
import WritingInfo from './WritingInfo';
import PromptMenu from './PromptMenu';
import Title from './Title';
import Alert from './Alert';

interface IWritingModalProps {
    writingId: string;
    writing?: IWriting;
    isWritingPage?: boolean;
    onClose: () => void;
}

const StyledHeader = styled(Header)`
    justify-content: flex-end;
`;

const StyledIconButton = styled(IconButton)`
    flex: 0 0 56px;
`;

const WritingModal = ({ writingId, writing, isWritingPage, onClose }: IWritingModalProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const saveAsMenu = useMenu();

    return (
        <Fragment>
            <Content>
                <StyledHeader>
                    <StyledIconButton onClick={onClose}>
                        <CancelOutlineIcon />
                    </StyledIconButton>
                </StyledHeader>
                <Title>{formatMessage('info')}</Title>
                {!!writing && <WritingInfo writing={writing} />}
                <Title>{formatMessage('actions')}</Title>
                <SettingsGroup>
                    <SettingsButton onClick={saveAsMenu.open}>
                        <Alert opened={saveAsMenu.opened} onClose={saveAsMenu.close}>
                            <PromptMenu
                                initialValue={writing?.title}
                                placeholder={formatMessage('enterTitle')}
                                onSave={(value) => {
                                    onClose();
                                    putWriting(writingId, { title: value });
                                }}
                                onClose={saveAsMenu.close}
                            />
                        </Alert>
                        {formatMessage('saveAs')}
                    </SettingsButton>
                    {!!writing && (
                        <SettingsButton
                            onClick={() => {
                                onClose();
                                shareWriting(writing?.id);
                            }}
                        >
                            {formatMessage('share')}
                        </SettingsButton>
                    )}
                    <SettingsButton
                        onClick={() => {
                            onClose();

                            if (isWritingPage) {
                                Router.back();
                            }

                            if (writing) {
                                deleteWriting(writing?.id);
                            }
                        }}
                    >
                        {formatMessage('remove')}
                    </SettingsButton>
                </SettingsGroup>
            </Content>
        </Fragment>
    );
};

export default WritingModal;
