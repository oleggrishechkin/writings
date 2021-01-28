class ILocalStorage {
    readonly paths = {
        user: 'state/user',
        lang: 'state/lang',
        theme: 'state/theme',
        search: 'state/search',
        writingsUpdatedOn: 'writingsUpdatedOn',
        savedScroll: 'savedScroll'
    };

    constructor() {}

    set(key: string, data: any): void {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    get<Type>(key: string): Type {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : item;
    }

    clear(): void {
        window.localStorage.clear();
    }
}

const LocalStorage = new ILocalStorage();

export default LocalStorage;
