import cx from 'clsx';
import theme from './TextButton.module.css';

const TextButton = (props) => (
    <button className={cx(props.className, theme.textButton)} onClick={props.onClick}>
        {props.children}
    </button>
);

export default TextButton;
