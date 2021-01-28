const getLocalStorageItem = <Type>(key: string): Type => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : item;
};

export default getLocalStorageItem;
