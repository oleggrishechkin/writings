import { useMemo, ReactElement } from 'react';
import styled from 'styled-components';
import { ReactComponent as UnfoldMoreIcon } from '../icons/unfold_more-24px.svg';
import useMenu from '../hooks/useMenu';
import Menu from './Menu';
import SelectMenu from './SelectMenu';
import SettingsButton from './SettingsButton';

interface ISettingsSelectProps<Type> {
    className?: string;
    options: Array<{ value: Type; label: string }>;
    value: Type;
    onChange: (nextValue: Type) => void;
    label: string;
}

const StyledSettingsSelect = styled(SettingsButton)`
    align-items: center;
    display: flex;
`;

const Label = styled.div`
    flex: 1 0 auto;
    margin-right: 0.5rem;
`;

const Value = styled.div`
    color: var(--gray);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledUnfoldMoreIcon = styled(UnfoldMoreIcon)`
    fill: var(--gray);
    flex: 0 0 auto;
`;

const SettingsSelect = <Type extends any>({
    className,
    options,
    value,
    onChange,
    label
}: ISettingsSelectProps<Type>): ReactElement => {
    const optionsMenu = useMenu();
    const selectedValue = useMemo(
        () => options?.find((option) => option.value === value)?.label || '',
        [options, value]
    );

    return (
        <StyledSettingsSelect className={className} onClick={optionsMenu.open}>
            <Label>{label}</Label>
            <Value>{selectedValue || (value && `${value}`)}</Value>
            <StyledUnfoldMoreIcon />
            <Menu opened={optionsMenu.opened} onClose={optionsMenu.close}>
                <SelectMenu value={value} options={options} onChange={onChange} onClose={optionsMenu.close} />
            </Menu>
        </StyledSettingsSelect>
    );
};

export default SettingsSelect;
