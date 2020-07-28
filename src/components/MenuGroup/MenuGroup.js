import cx from 'clsx';
import theme from './MenuGroup.module.css';

const MenuGroup = (props) => (
    <div className={cx(props.className, theme.menuGroup, { [theme.horizontal]: props.horizontal })}>
        {props.children}
    </div>
);

export default MenuGroup;
