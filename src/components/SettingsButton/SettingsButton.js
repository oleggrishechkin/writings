import cx from 'clsx';
import theme from './SettingsButton.module.css';

const SettingsButton = (props) => (
    <button className={cx(props.className, theme.settingsButton)} onClick={props.onClick}>
        {props.children}
    </button>
);

export default SettingsButton;
