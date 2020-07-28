import cx from 'clsx';
import theme from './IconButton.module.css';

const IconButton = (props) => (
    <button
        className={cx(props.className, theme.iconButton, { [theme.gray]: props.gray })}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
    >
        {props.children}
    </button>
);

export default IconButton;
