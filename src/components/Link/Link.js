import cx from 'clsx';
import History from '../../proxies/History';
import theme from './Link.module.css';

const Link = (props) => (
    <a
        className={cx(props.className, theme.link)}
        href={props.href}
        onClick={(event) => {
            event.preventDefault();
            History.pushState({}, props.href);
        }}
    >
        {props.children}
    </a>
);

export default Link;
