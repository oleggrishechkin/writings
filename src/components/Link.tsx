import React, { ReactElement } from 'react';
import Router from '../classes/Router';
import preventDefault from '../utils/preventDefault';

interface IProps {
    'aria-label'?: string;
    className?: string;
    href?: string;
    children: any;
}

const Link = ({ 'aria-label': ariaLabel, className, href, children }: IProps): ReactElement => (
    <a
        aria-label={ariaLabel}
        className={className}
        href={href}
        onClick={(event) => {
            if (href) {
                preventDefault(event);
                Router.push(href);
            }
        }}
    >
        {children}
    </a>
);

export default Link;
