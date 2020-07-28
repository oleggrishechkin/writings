import cx from 'clsx';
import theme from './Avatar.module.css';

const Avatar = (props) => (
    <div
        className={cx(props.className, theme.avatar, {
            [theme[`size_${props.size}`]]: !!props.size
        })}
    >
        <img className={theme.image} alt="avatar" src={props.src} />
    </div>
);

export default Avatar;
