import { useMemo } from 'react';
import Router from '../classes/Router';

const usePermanentMatch = <Type extends Record<string, any>>(path: string): Type =>
    useMemo(() => {
        const matchResult = Router.match<Type>(path, window.location.pathname);

        return matchResult === false ? ({} as Type) : matchResult;
    }, [path]);

export default usePermanentMatch;
