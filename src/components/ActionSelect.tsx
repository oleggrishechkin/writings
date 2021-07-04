import React, { ReactElement } from 'react';
import cx from 'clsx';
import UnfoldMoreIcon from '../icons/UnfoldMoreIcon';

interface IProps<Type> {
    className?: string;
    value: Type;
    options: Array<{ value: Type; label: string }>;
    onChange: (nextValue: Type) => void;
    label: string;
}

const ActionSelect = <Type extends any>({ className, options, value, onChange, label }: IProps<Type>): ReactElement => {
    const selectedIndex = options?.findIndex((option) => option.value === value);
    const selectedValue = options[selectedIndex]?.label || '';

    return (
        <label
            className={cx(
                className,
                'active:opacity-50 bg-light-gray-6 cursor-pointer dark:bg-dark-gray-6 duration-300 flex items-center p-4 relative transition-opacity'
            )}
        >
            <span className="flex-auto">{label}</span>
            <span className="dark:text-light-gray-2 text-dark-gray-2">{selectedValue || (value && `${value}`)}</span>
            <UnfoldMoreIcon className="ml-4" />
            <select
                className="absolute appearance-none h-full left-0 opacity-0 top-0 w-full"
                value={selectedIndex}
                onChange={(event) => onChange(options[+event.target.value].value)}
            >
                {options.map((option, index) => (
                    <option key={index} value={index}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default ActionSelect;
