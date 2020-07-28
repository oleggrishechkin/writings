import cx from 'clsx';
import { v1 as uuidv1 } from 'uuid';
import AddCircleIcon from '../../icons/add_circle-24px.svg';
import History from '../../proxies/History';
import LocalStorage from '../../proxies/LocalStorage';
import translate from '../../utils/translate';
import theme from './AddWriting.module.css';

const AddWriting = (props) => (
    <button
        className={cx(props.className, theme.addWriting)}
        onClick={() => History.pushState({}, `/writings/${LocalStorage.getItem('user')?.localId}/${uuidv1()}`)}
    >
        <AddCircleIcon className={theme.icon} />
        <div>{translate('addWriting')}</div>
    </button>
);

export default AddWriting;
