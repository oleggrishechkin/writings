import cx from 'clsx';
import { createMemo, createSignal } from 'solid-js';
import UnfoldMoreIcon from '../../icons/unfold_more-24px.svg';
import Menu from '../Menu/Menu';
import SelectMenu from '../SelectMenu/SelectMenu';
import SettingsButton from '../SettingsButton/SettingsButton';
import theme from './SettingsSelect.module.css';

const SettingsSelect = (props) => {
    const [menuSignal, setMenuSignal] = createSignal(false);
    const selectedValue = createMemo(() => props.options?.find(({ value }) => value === props.value)?.label || '');

    return (
        <SettingsButton className={cx(props.className, theme.settingSelect)} onClick={() => setMenuSignal(true)}>
            <div className={theme.label}>{props.label}</div>
            <div className={theme.value}>{selectedValue() || props.value}</div>
            <UnfoldMoreIcon className={theme.icon} />
            <Menu opened={menuSignal()} onClose={() => setMenuSignal(false)}>
                <SelectMenu
                    value={props.value}
                    options={props.options}
                    onChange={props.onChange}
                    onClose={() => setMenuSignal(false)}
                />
            </Menu>
        </SettingsButton>
    );
};

export default SettingsSelect;
