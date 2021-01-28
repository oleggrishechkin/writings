import { Fragment, useState, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import putWriting from '../actions/putWriting';
import { ReactComponent as ArrowBackIosIcon } from '../icons/arrow_back_ios-24px.svg';
import { ReactComponent as MoreHorizIcon } from '../icons/more_horiz-24px.svg';
import intlState from '../store/states/intlState';
import writingsState from '../store/states/writingsState';
import fetchWriting from '../actions/fetchWriting';
import useFetch from '../hooks/useFetch';
import usePermanentMatch from '../hooks/usePermanentMatch';
import useMenu from '../hooks/useMenu';
import Router from '../classes/Router';
import Menu from './Menu';
import IconButton from './IconButton';
import Header from './Header';
import EditorMenu from './EditorMenu';
import Editor from './Editor';
import Content from './Content';
import Modal from './Modal';
import WritingModal from './WritingModal';

const StyledIconButton = styled(IconButton)`
    flex: 0 0 56px;
`;

const StyledEditor = styled(Editor)`
    flex: 1 0 auto;
    font-size: var(--fontNormal);

    &:after {
        content: '';
        display: block;
        height: 100vh;
        pointer-events: none;
        width: 100%;
    }
`;

const WritingPage = (): ReactElement => {
    const { writingId } = usePermanentMatch<{ writingId: string }>(Router.paths.writing);
    const writing = useSelector(() => writingsState()[writingId], [writingId]);
    const [focused, setFocused] = useState(false);
    const editorMenu = useMenu();
    const writingModal = useMenu();
    const { formatMessage } = useSelector(intlState);

    useFetch(fetchWriting, writingId);

    return (
        <Fragment>
            <Content name={writingId}>
                <Header>
                    <StyledIconButton onClick={() => Router.back()}>
                        <ArrowBackIosIcon />
                    </StyledIconButton>
                    <StyledIconButton
                        onMouseDown={(event) => {
                            if (focused) {
                                event.preventDefault();
                                editorMenu.open();
                            } else {
                                writingModal.open();
                            }
                        }}
                    >
                        <MoreHorizIcon />
                        <Menu opened={editorMenu.opened} onClose={editorMenu.close}>
                            {focused && <EditorMenu onClose={editorMenu.close} />}
                        </Menu>
                        <Modal opened={writingModal.opened} onClose={writingModal.close}>
                            <WritingModal
                                writingId={writingId}
                                writing={writing}
                                isWritingPage
                                onClose={writingModal.close}
                            />
                        </Modal>
                    </StyledIconButton>
                </Header>
                <StyledEditor
                    inputMode={editorMenu.opened ? 'none' : undefined}
                    value={writing?.content}
                    placeholder={formatMessage('startTyping')}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => setFocused(false)}
                    onChange={(html) => putWriting(writingId, { content: html })}
                />
            </Content>
        </Fragment>
    );
};

export default WritingPage;
