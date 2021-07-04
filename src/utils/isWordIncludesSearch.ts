const isWordIncludesSearch = (word: string | null | undefined, search: string | null | undefined): boolean =>
    (word || '').toLowerCase().includes((search || '').toLowerCase());

export default isWordIncludesSearch;
