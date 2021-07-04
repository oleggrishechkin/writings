import { IBrowserLang } from '../utils/getBrowserLang';
import { IUser } from './Auth';

export type ILang = null | IBrowserLang;

export type ITheme = null | 'light' | 'dark';

export type ISearch = null | string;

interface ILocalStorageScheme {
    'state/user': IUser | null;
    'state/lang': ILang;
    'state/theme': ITheme;
    'state/search': ISearch;
    writingsUpdatedOn: number;
    savedScroll: Record<string, number>;
}

class LocalStorageClass {
    set<Type extends keyof ILocalStorageScheme>(key: Type, data: ILocalStorageScheme[Type]): void {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    get<Type extends keyof ILocalStorageScheme>(key: Type): ILocalStorageScheme[Type] {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : item;
    }

    clear(): void {
        window.localStorage.clear();
    }
}

const LocalStorage = new LocalStorageClass();

export default LocalStorage;
