const setLocalStorageItem = <Type>(key: string, value: Type): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

export default setLocalStorageItem;
