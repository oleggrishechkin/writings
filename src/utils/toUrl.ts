const toUrl = (path: string, params: Record<string, any>): string =>
    path
        .split('/')
        .map((pathPart) => (pathPart.startsWith(':') ? params[pathPart.slice(1)] : pathPart))
        .join('/');

export default toUrl;
