const arrayToObject = <Type extends Record<string, any>>(array: Type[], key: keyof Type): Record<string, Type> =>
    array.reduce((result, item) => {
        result[item[key]] = item;

        return result;
    }, {} as Record<string, Type>);

export default arrayToObject;
