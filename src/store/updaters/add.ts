import copy from './copy';

const add =
    <Type>(key: string, data: Type) =>
    (object: Record<string, Type>): Record<string, Type> => {
        const objectCopy = copy()(object);

        objectCopy[key] = data;

        return objectCopy;
    };

export default add;
