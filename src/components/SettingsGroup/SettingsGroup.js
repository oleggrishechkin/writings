import cx from 'clsx';
import theme from './SettingsGroup.module.css';

const SettingsGroup = (props) => <div className={cx(props.className, theme.settingsGroup)}>{props.children}</div>;

export default SettingsGroup;
