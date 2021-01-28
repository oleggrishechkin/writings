const shallowEqual = <Type extends Record<string, any>>(target: Type, source: Type): boolean => {
    const targetKeys = Object.keys(target);

    return targetKeys.length === Object.keys(source).length && targetKeys.every((key) => target[key] === source[key]);
};

export default shallowEqual;
