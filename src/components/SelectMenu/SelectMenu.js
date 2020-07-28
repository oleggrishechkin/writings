import { For } from 'solid-js';
import translate from '../../utils/translate';
import MenuButton from '../MenuButton/MenuButton';
import MenuGroup from '../MenuGroup/MenuGroup';

const SelectMenu = (props) => (
    <>
        <MenuGroup>
            <For each={props.options}>
                {(option) => (
                    <MenuButton active={option.value === props.value} onClick={() => props.onChange(option.value)}>
                        {option.label}
                    </MenuButton>
                )}
            </For>
        </MenuGroup>
        <MenuGroup>
            <MenuButton onClick={props.onClose}>{translate('cancel')}</MenuButton>
        </MenuGroup>
    </>
);

export default SelectMenu;
