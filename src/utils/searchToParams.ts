const searchToParams = <Type extends Record<string, string>>(search: string): Type => {
    const result: Record<string, string> = {};
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

    for (const [key, value] of params) {
        result[key] = value;
    }

    return result as Type;
};

export default searchToParams;
