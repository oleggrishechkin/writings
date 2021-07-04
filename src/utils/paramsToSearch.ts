const paramsToSearch = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
    });

    const search = searchParams.toString();

    return search && `?${search}`;
};

export default paramsToSearch;
