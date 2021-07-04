import { match } from 'path-to-regexp';
import { useMemo } from 'react';
import pathnameState from '../store/states/pathnameState';

const usePermanentMatch = <Type extends Record<string, any>>(path: string): Type =>
    useMemo(() => {
        const matched = match(path)(pathnameState());

        return (matched ? matched.params : {}) as Type;
    }, [path]);

export default usePermanentMatch;
