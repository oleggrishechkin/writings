import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import intlState from '../store/states/intlState';
import MenuButton from './MenuButton';
import MenuGroup from './MenuGroup';

interface ISelectMenuProps<Type> {
    options: Array<{ value: Type; label: string }>;
    value: Type;
    onChange: (nextValue: Type) => void;
    onClose: () => void;
}

const SelectMenu = <Type extends any>({ options, value, onChange, onClose }: ISelectMenuProps<Type>): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <Fragment>
            <MenuGroup>
                {options.map((option, index) => (
                    <MenuButton key={index} data-active={option.value === value} onClick={() => onChange(option.value)}>
                        {option.label}
                    </MenuButton>
                ))}
            </MenuGroup>
            <MenuGroup>
                <MenuButton onClick={onClose}>{formatMessage('cancel')}</MenuButton>
            </MenuGroup>
        </Fragment>
    );
};

export default SelectMenu;
