import { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from '../icons/cancel-24px.svg';
import { ReactComponent as SearchIcon } from '../icons/search-24px.svg';
import { TSearch } from '../states/searchState';
import intlState from '../states/intlState';
import IconButton from './IconButton';
import TextButton from './TextButton';

interface ISearchInputProps {
    className?: string;
    value: TSearch;
    onChange: (nextValue: TSearch) => void;
}

const StyledSearchInput = styled.div`
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

const StyledSearchIcon = styled(SearchIcon)`
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

const StyledIconButton = styled(IconButton)`
    flex: 0 0 auto;
`;

const StyledTextButton = styled(TextButton)`
    flex: 0 0 auto;
    margin-left: 1rem;
`;

const SearchInput = ({ className, value = null, onChange }: ISearchInputProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <StyledSearchInput className={className}>
            <Label>
                <StyledSearchIcon />
                <Input
                    inputMode="search"
                    value={value || ''}
                    placeholder={formatMessage('search')}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    onFocus={() => {
                        if (value === null) {
                            onChange('');
                        }
                    }}
                    onBlur={() => {
                        if (!value) {
                            onChange(null);
                        }
                    }}
                />
                {!!value && (
                    <StyledIconButton data-gray onClick={() => onChange('')}>
                        <CancelIcon />
                    </StyledIconButton>
                )}
            </Label>
            {value !== null && (
                <StyledTextButton onClick={() => onChange(null)}>{formatMessage('cancel')}</StyledTextButton>
            )}
        </StyledSearchInput>
    );
};

export default SearchInput;
