import { createSignal } from 'solid-js';
import formatDate from '../../utils/formatDate';
import translate from '../../utils/translate';
import theme from './Date.module.css';

const Date = (props) => {
    const [isCreatedSignal, setIsCreatedSignal] = createSignal(null);

    return (
        <div
            className={theme.date}
            onClick={() => {
                setIsCreatedSignal(!isCreatedSignal());
            }}
        >
            {`${
                isCreatedSignal() === null ? '' : `${translate(isCreatedSignal() ? 'created' : 'edited')}: `
            }${formatDate(isCreatedSignal() ? props.createdOn : props.updatedOn, true)}`}
        </div>
    );
};

export default Date;
