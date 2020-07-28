import cx from 'clsx';
import { Show } from 'solid-js';
import CancelIcon from '../../icons/cancel-24px.svg';
import SearchIcon from '../../icons/search-24px.svg';
import translate from '../../utils/translate';
import IconButton from '../IconButton/IconButton';
import TextButton from '../TextButton/TextButton';
import theme from './Search.module.css';

const Search = (props) => (
    <div className={cx(props.className, theme.search)}>
        <label className={theme.input}>
            <SearchIcon className={cx(theme.icon, theme.searchIcon)} />
            <input
                inputMode="search"
                className={theme.inputElement}
                value={props.value || ''}
                placeholder={translate('search')}
                onInput={(event) => props.onChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                        event.target.blur();
                    }
                }}
                onFocus={() => {
                    if (props.value === null) {
                        props.onChange('');
                    }
                }}
                onBlur={() => {
                    if (!props.value) {
                        props.onChange(null);
                    }
                }}
            />
            <Show when={!!props.value}>
                <IconButton className={theme.icon} gray onClick={() => props.onChange('')}>
                    <CancelIcon />
                </IconButton>
            </Show>
        </label>
        <Show when={props.value !== null}>
            <TextButton className={theme.cancel} onClick={() => props.onChange(null)}>
                {translate('cancel')}
            </TextButton>
        </Show>
    </div>
);

export default Search;
