import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import { ReactComponent as CancelOutlineIcon } from '../icons/cancel_outlile-24px.svg';
import intlState from '../states/intlState';
import { IWriting } from '../states/writingsState';
import shareWriting from '../actions/shareWriting';
import navBack from '../actions/navBack';
import deleteWriting from '../actions/deleteWriting';
import putWriting from '../actions/putWriting';
import Content from './Content';
import Header from './Header';
import IconButton from './IconButton';
import SettingsButton from './SettingsButton';
import SettingsGroup from './SettingsGroup';
import Title from './Title';
import EditInput from './EditInput';

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

    return (
        <Fragment>
            <StyledHeader>
                <StyledIconButton onClick={onClose}>
                    <CancelOutlineIcon />
                </StyledIconButton>
            </StyledHeader>
            <Content>
                <Title>{formatMessage('title')}</Title>
                <EditInput value={writing?.title} onChange={(title) => putWriting(writingId, { title })} />
                <Title>{formatMessage('actions')}</Title>
                <SettingsGroup>
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
                                navBack();
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
