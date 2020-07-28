import cx from 'clsx';
import theme from './Title.module.css';

const Title = (props) => (
    <div className={cx(props.className, theme.title)} onClick={props.onClick}>
        {props.children}
    </div>
);

export default Title;
