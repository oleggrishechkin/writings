import cx from 'clsx';
import theme from './Header.module.css';

const Header = (props) => <header className={cx(props.className, theme.header)}>{props.children}</header>;

export default Header;
