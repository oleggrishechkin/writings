class IFetchCache {
    #pending: Record<string, Promise<void>>;
    #fulfilled: Record<string, boolean>;

    constructor() {
        this.#pending = {};
        this.#fulfilled = {};
    }

    clear() {
        this.#pending = {};
        this.#fulfilled = {};
    }

    withCache<Type extends (...args: any[]) => Promise<void>>(
        getName: (...args: Parameters<Type>) => string,
        action: Type
    ) {
        return async (...args: Parameters<Type>): Promise<void> => {
            const name = getName(...args);

            if (this.#pending[name]) {
                return this.#pending[name];
            }

            if (this.#fulfilled[name]) {
                return;
            }

            this.#pending[name] = action(...args);

            await this.#pending[name];

            if (this.#pending[name]) {
                delete this.#pending[name];

                this.#fulfilled[name] = true;
            }
        };
    }
}

const FetchCache = new IFetchCache();

export default FetchCache;
