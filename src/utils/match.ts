const match = <Type extends Record<string, string>>(path: string, url: string): false | Type => {
    const splitPath = path.split('/');
    const splitUrl = url.split('/');

    if (splitPath.length !== splitUrl.length) {
        return false;
    }

    const params: Record<string, string> = {};

    for (let index = 0; index < splitPath.length; ++index) {
        if (splitPath[index].includes(':')) {
            params[splitPath[index].slice(1)] = splitUrl[index];

            continue;
        }

        if (splitPath[index] !== splitUrl[index]) {
            return false;
        }
    }

    return params as Type;
};

export default match;
