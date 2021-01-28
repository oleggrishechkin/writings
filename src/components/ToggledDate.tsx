import { ReactElement, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import intlState from '../store/states/intlState';

interface IDateProps {
    className?: string;
    disabled?: boolean;
    createdOn: number;
    updatedOn: number;
}

const StyledDate = styled.div`
    color: var(--gray);
    font-size: var(--fontSmall);
    white-space: nowrap;
    &[data-disabled='true'] {
        pointer-events: none;
    }
`;

const ToggledDate = ({ className, disabled, createdOn, updatedOn }: IDateProps): ReactElement => {
    const [isCreated, setIsCreated] = useState<null | boolean>(null);
    const { formatMessage, formatDate } = useSelector(intlState);

    return (
        <StyledDate
            data-disabled={disabled}
            className={className}
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setIsCreated((currentIsCreated) => !currentIsCreated);
            }}
        >
            {`${isCreated === null ? '' : `${formatMessage(isCreated ? 'created' : 'edited')}: `}${formatDate(
                isCreated ? createdOn : updatedOn
            )}`}
        </StyledDate>
    );
};

export default ToggledDate;
