import cx from 'clsx';
import theme from './MenuButton.module.css';

const MenuButton = (props) => (
    <button className={cx(props.className, theme.menuButton, { [theme.active]: props.active })} onClick={props.onClick}>
        {props.children}
    </button>
);

export default MenuButton;
