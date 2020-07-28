const matchPath = (path, pathname) => {
    const splitPath = path.split('/');
    const splitPathname = pathname.split('/');

    if (splitPath.length !== splitPathname.length) {
        return null;
    }

    const params = {};

    for (let index = 0; index < splitPath.length; ++index) {
        if (splitPath[index].startsWith(':')) {
            params[splitPath[index].slice(1)] = splitPathname[index];

            continue;
        }

        if (splitPath[index] !== splitPathname[index]) {
            return null;
        }
    }

    return params;
};

export default matchPath;
