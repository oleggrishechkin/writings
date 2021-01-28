import { useSelector } from 'react-tagged-state';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { IWriting } from '../store/states/writingsState';
import intlState from '../store/states/intlState';
import ToggledDate from './ToggledDate';

interface IWritingInfoProps {
    writing: IWriting;
}

const StyledWritingInfo = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > * {
        flex: 0 0 auto;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Title = styled.div`
    font-size: var(--fontNormal);
`;

const StyledToggledDate = styled(ToggledDate)`
    font-size: var(--fontDefault);
`;

const WritingInfo = ({ writing }: IWritingInfoProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <StyledWritingInfo>
            <Title>{writing.title || formatMessage('noTitle')}</Title>
            <StyledToggledDate createdOn={writing.createdOn} updatedOn={writing.updatedOn} />
        </StyledWritingInfo>
    );
};

export default WritingInfo;
