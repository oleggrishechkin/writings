import cx from 'clsx';
import theme from './PrimaryButton.module.css';

const PrimaryButton = (props) => (
    <button className={cx(props.className, theme.primaryButton)} onClick={props.onClick}>
        {props.children}
    </button>
);

export default PrimaryButton;
