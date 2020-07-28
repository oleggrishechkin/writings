const getParams = (search) => {
    const result = {};

    new URLSearchParams(search.slice(1)).forEach((value, key) => {
        result[key] = value;
    });

    return result;
};

export default getParams;
