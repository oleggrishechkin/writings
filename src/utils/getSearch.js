const getSearch = (params) => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
        if (params[key]) {
            searchParams.append(key, params[key]);
        }
    });

    return `?${searchParams.toString()}`;
};

export default getSearch;
