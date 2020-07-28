import cx from 'clsx';
import translate from '../../utils/translate';
import Link from '../Link/Link';
import theme from './Writing.module.css';

const Writing = (props) => (
    <Link
        className={cx(props.className, theme.writing)}
        href={`/writings/${props.writing._createdBy}/${props.writing.id}`}
    >
        <div className={theme.title}>{props.writing.title || '***'}</div>
        <div className={theme.content} innerHTML={props.writing.content || translate('empty')} />
    </Link>
);

export default Writing;
