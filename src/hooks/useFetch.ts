import { useCallback, useEffect, useState } from 'react';

export interface IFetchState<Type> {
    isLoading: boolean;
    result: Type | null;
    error: any | null;
}

export interface IFetch<Type, Args extends any[]> {
    (...any: Args): Promise<Type>;
}

const useFetch = <Result = null, Args extends any[] = []>(
    asyncFunction: IFetch<Result, Args>,
    ...args: Args
): IFetchState<Result> => {
    const memoizedAsyncFunction = useCallback(() => asyncFunction(...args), [asyncFunction, ...args]);
    const [state, setState] = useState<[IFetchState<Result>, IFetch<Result, []>]>([
        { isLoading: true, result: null, error: null },
        memoizedAsyncFunction
    ]);

    useEffect(() => {
        memoizedAsyncFunction()
            .then((result) => {
                setState((prevState) => {
                    if (memoizedAsyncFunction !== prevState[1]) {
                        return prevState;
                    }

                    return [{ isLoading: false, result, error: null }, memoizedAsyncFunction];
                });
            })
            .catch((error) => {
                setState((prevState) => {
                    if (memoizedAsyncFunction !== prevState[1]) {
                        return prevState;
                    }

                    return [{ isLoading: false, result: null, error: error }, memoizedAsyncFunction];
                });
            });
    }, [memoizedAsyncFunction]);

    if (memoizedAsyncFunction !== state[1]) {
        state[0] = { isLoading: true, result: null, error: null };
        state[1] = memoizedAsyncFunction;
    }

    return state[0];
};

export default useFetch;
