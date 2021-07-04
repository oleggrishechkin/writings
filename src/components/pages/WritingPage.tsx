import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import putWriting from '../../actions/putWriting';
import MoreHorizIcon from '../../icons/MoreHorizIcon';
import writingsState from '../../store/states/writingsState';
import fetchWriting from '../../actions/fetchWriting';
import useFetch from '../../hooks/useFetch';
import usePermanentMatch from '../../hooks/usePermanentMatch';
import useSavedScroll from '../../hooks/useSavedScroll';
import IconButton from '../IconButton';
import Editor from '../Editor';
import CornerAction from '../CornerAction';
import Router from '../../classes/Router';
import ArrowBackIosIcon from '../../icons/ArrowBackIosIcon';
import useToggle from '../../hooks/useToggle';
import Modal from '../Modal';
import WritingModal from '../modals/WritingModal';
import preventDefault from '../../utils/preventDefault';
import AddIcon from '../../icons/AddIcon';
import Menu from '../Menu';
import RichStylesActions from '../RichStylesActions';

const WritingPage = (): ReactElement => {
    const { writingId } = usePermanentMatch<{ writingId: string }>('/writings/:writingId');
    const writing = useSelector(() => writingsState()[writingId], [writingId]);
    const richStyleMenu = useToggle();
    const writingModal = useToggle();
    const [focused, setFocused] = useState(false);

    useFetch(fetchWriting, writingId);
    useSavedScroll(`/writing/${writingId}`);

    return (
        <>
            <div className="flex items-center justify-between mb-8 sticky top-0 z-10">
                <IconButton aria-label="back" onClick={() => Router.back()}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton aria-label="more" onClick={writingModal.toggle}>
                    <MoreHorizIcon />
                </IconButton>
            </div>
            <Editor
                className="after:block after:h-screen after:w-full"
                inputMode={richStyleMenu.opened ? 'none' : undefined}
                value={writing?.content}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(html) => putWriting(writingId, { content: html })}
            />
            <CornerAction opened={focused}>
                <IconButton aria-label="richStyle" onClick={richStyleMenu.toggle} onMouseDown={preventDefault}>
                    <AddIcon />
                </IconButton>
            </CornerAction>
            <Menu opened={richStyleMenu.opened} onClose={richStyleMenu.close} onMouseDown={preventDefault}>
                <RichStylesActions onClose={richStyleMenu.close} />
            </Menu>
            <Modal opened={writingModal.opened} onClose={writingModal.close}>
                <WritingModal writingId={writingId} writing={writing} onClose={writingModal.close} />
            </Modal>
        </>
    );
};

export default WritingPage;
