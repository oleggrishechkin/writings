import copy from './copy';

const remove =
    <Type>(key: string) =>
    (object: Record<string, Type>): Record<string, Type> => {
        const objectCopy = copy()(object);

        delete objectCopy[key];

        return objectCopy;
    };

export default remove;
