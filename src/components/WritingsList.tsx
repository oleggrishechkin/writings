import React, { ReactElement } from 'react';
import cx from 'clsx';
import { IWriting } from '../classes/Database';
import Writing from './Writing';

interface IProps {
    className?: string;
    writings: IWriting[];
}

const WritingsList = ({ className, writings }: IProps): ReactElement => (
    <ol className={cx(className, 'grid grid-cols-2 list-none')}>
        {writings.map((writing) => (
            <li key={writing.id}>
                <Writing writing={writing} />
            </li>
        ))}
    </ol>
);

export default WritingsList;
