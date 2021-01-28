import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import intlState from '../states/intlState';
import { ReactComponent as EditIcon } from '../icons/edit-24px.svg';
import TextButton from './TextButton';

interface IEditInputProps {
    className?: string;
    value?: string;
    onChange: (nextValue: string) => void;
}

const StyledEditInput = styled.div`
    align-items: center;
    display: flex;
`;

const Label = styled.label`
    align-items: center;
    background: var(--gray-6);
    border-radius: 10px;
    display: flex;
    fill: var(--gray);
    flex: 1 1 auto;
    padding: 0.5rem;
    transition: background 300ms;
    &:active {
        background: var(--gray-4);
    }
`;

const StyledSearchIcon = styled(EditIcon)`
    flex: 0 0 auto;
    fill: var(--gray);
`;

const Input = styled.input`
    background: transparent;
    border: none;
    border-radius: 0;
    color: inherit;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--fontNormal);
    line-height: inherit;
    margin: 0 0.5rem 0 0.5rem;
    outline: none;
    user-select: text;
    width: 100%;
    &::-webkit-input-placeholder {
        color: var(--gray);
    }
    &:-moz-placeholder {
        color: var(--gray);
    }
    &::-moz-placeholder {
        color: var(--gray);
    }
    &:-ms-input-placeholder {
        color: var(--gray);
    }
`;

const StyledTextButton = styled(TextButton)`
    flex: 0 0 auto;
    margin-left: 1rem;
`;

const EditInput = ({ className, value, onChange }: IEditInputProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const [state, setState] = useState(value || '');

    useEffect(() => {
        setState(value || '');
    }, [value]);

    return (
        <StyledEditInput className={className}>
            <Label>
                <StyledSearchIcon />
                <Input
                    value={state}
                    placeholder={formatMessage('noTitle')}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            if (value !== state) {
                                onChange(state);
                            }

                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    onChange={(event) => setState(event.target.value)}
                />
            </Label>
            {value !== state && (
                <StyledTextButton onClick={() => onChange(state)}>{formatMessage('save')}</StyledTextButton>
            )}
        </StyledEditInput>
    );
};

export default EditInput;
