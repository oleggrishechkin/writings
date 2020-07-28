import cx from 'clsx';
import theme from './MenuIconButton.module.css';

const MenuIconButton = (props) => (
    <button
        className={cx(props.className, theme.menuIconButton, { [theme.active]: props.active })}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

export default MenuIconButton;
