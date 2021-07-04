import { cloneElement, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import { pathToRegexp } from 'path-to-regexp';
import pathnameState from '../store/states/pathnameState';

interface IProps {
    path: string;
    children: any;
}

const Route = ({ path, children }: IProps): ReactElement => {
    const pathname = useSelector(pathnameState);

    return cloneElement(children, { opened: pathToRegexp(path).test(pathname) });
};

export default Route;
