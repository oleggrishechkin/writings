let pending: Record<string, Promise<void>> = {};
let fulfilled: Record<string, boolean> = {};

const withCache = <Type extends (...args: any[]) => Promise<void>>(
    getName: (...args: Parameters<Type>) => string,
    action: Type
) => {
    return async (...args: Parameters<Type>): Promise<void> => {
        const name = getName(...args);

        if (pending[name]) {
            return pending[name];
        }

        if (fulfilled[name]) {
            return;
        }

        pending[name] = action(...args);

        await pending[name];

        if (pending[name]) {
            delete pending[name];

            fulfilled[name] = true;
        }
    };
};

withCache.clear = () => {
    pending = {};
    fulfilled = {};
};

export default withCache;
