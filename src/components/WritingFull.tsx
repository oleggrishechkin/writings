import { ReactElement } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-tagged-state';
import { IWriting } from '../store/states/writingsState';
import toUrl from '../utils/toUrl';
import intlState from '../store/states/intlState';
import Router from '../classes/Router';
import useMenu from '../hooks/useMenu';
import useLongTouch from '../hooks/useLongTouch';
import Link from './Link';
import ToggledDate from './ToggledDate';
import EditorRender from './EditorRender';
import WritingModal from './WritingModal';
import Modal from './Modal';

interface IWritingFullProps {
    className?: string;
    writing: IWriting;
}

const StyledWritingFull = styled(Link)`
    background: var(--secondary-background);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    padding: 1rem;
    flex-direction: column;
    transition: background 300ms, transform 300ms;
    justify-content: space-between;
    &:active {
        background: var(--gray-4);
        transform: scale(1.1);
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Title = styled.div`
    font-size: var(--fontNormal);
    font-weight: bold;
    white-space: nowrap;
    text-shadow: var(--shadowDefault);
`;

const StyledEditorRender = styled(EditorRender)`
    height: calc(3 * 1.15 * var(--fontDefault));
`;

const Writing = ({ className, writing }: IWritingFullProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const writingModal = useMenu();
    const [onTouchStart, onTouchEndOrMove] = useLongTouch(writingModal.open);

    return (
        <StyledWritingFull
            className={className}
            href={toUrl(Router.paths.writing, { writingId: writing.id })}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEndOrMove}
            onTouchMove={onTouchEndOrMove}
        >
            <Modal opened={writingModal.opened} onClose={writingModal.close}>
                <WritingModal writingId={writing.id} writing={writing} onClose={writingModal.close} />
            </Modal>
            <Title>{writing.title || formatMessage('noTitle')}</Title>
            <ToggledDate createdOn={writing.createdOn} updatedOn={writing.updatedOn} disabled />
            {writing.content && <StyledEditorRender value={writing.content} />}
        </StyledWritingFull>
    );
};

export default Writing;
