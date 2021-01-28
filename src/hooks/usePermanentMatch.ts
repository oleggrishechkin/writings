import { useMemo } from 'react';
import match from '../utils/match';

const usePermanentMatch = <Type extends Record<string, any>>(path: string): Type =>
    useMemo(() => {
        const matchResult = match<Type>(path, window.location.pathname);

        return matchResult === false ? ({} as Type) : matchResult;
    }, [path]);

export default usePermanentMatch;
