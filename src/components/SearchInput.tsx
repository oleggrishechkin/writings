import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import cx from 'clsx';
import CancelIcon from '../icons/CancelIcon';
import SearchIcon from '../icons/SearchIcon';
import intlState from '../store/states/intlState';
import { ISearch } from '../classes/LocalStorage';
import preventBodyScroll from '../utils/preventBodyScroll';
import IconButton from './IconButton';

interface IProps {
    className?: string;
    value: ISearch;
    onChange: (nextValue: ISearch) => void;
}

const SearchInput = ({ className, value = null, onChange }: IProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <div className={cx(className, 'flex items-center')}>
            <label
                className={cx(
                    'active:opacity-50 bg-light-gray-6 cursor-text dark:bg-dark-gray-6 duration-300 flex flex-auto items-center p-2 rounded-xl shadow-xl transition-opacity'
                )}
            >
                <SearchIcon className="dark:text-light-gray-2 flex-shrink-0 mr-2 text-dark-gray-2" />
                <input
                    className="dark:placeholder-light-gray-2 placeholder-dark-gray-2 w-full"
                    inputMode="search"
                    value={value || ''}
                    placeholder={formatMessage('search')}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    onFocus={() => {
                        if (value === null) {
                            onChange('');
                        }

                        preventBodyScroll();
                    }}
                    onBlur={() => {
                        if (!value) {
                            onChange(null);
                        }
                    }}
                />
                {!!value && (
                    <IconButton
                        aria-label="clear"
                        className="dark:text-light-gray-2 flex-shrink-0 ml-2 text-dark-gray-2"
                        onClick={() => onChange('')}
                    >
                        <CancelIcon />
                    </IconButton>
                )}
            </label>
            {value !== null && (
                <IconButton className="flex-shrink-0 ml-2" onClick={() => onChange(null)}>
                    {formatMessage('cancel')}
                </IconButton>
            )}
        </div>
    );
};

export default SearchInput;
