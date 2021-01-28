import { ReactElement } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-tagged-state';
import { IWriting } from '../states/writingsState';
import navRoutes from '../constants/navRoutes';
import toUrl from '../utils/toUrl';
import intlState from '../states/intlState';
import Link from './Link';
import ToggledDate from './ToggledDate';

interface IWritingProps {
    className?: string;
    writing: IWriting;
}

const StyledWriting = styled(Link)`
    background: var(--gray-6);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    padding: 1rem;
    flex-direction: column;
    transition: background 300ms;
    justify-content: space-between;
    &:active {
        background: var(--gray-4);
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Title = styled.div`
    font-size: var(--fontNormal);
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Writing = ({ className, writing }: IWritingProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <StyledWriting className={className} href={toUrl(navRoutes.writing, { writingId: writing.id })}>
            <Title>{writing.title || formatMessage('noTitle')}</Title>
            <ToggledDate createdOn={writing._createdOn} updatedOn={writing._updatedOn} />
        </StyledWriting>
    );
};

export default Writing;
