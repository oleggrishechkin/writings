const includes = (target: string | null | undefined, string: string | null | undefined): boolean =>
    (target || '').toLowerCase().includes((string || '').toLowerCase());

export default includes;
