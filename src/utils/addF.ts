import copyF from './copyF';

const addF =
    <Type>(key: string, data: Type) =>
    (object: Record<string, Type>): Record<string, Type> => {
        const objectCopy = copyF()(object);

        objectCopy[key] = data;

        return objectCopy;
    };

export default addF;
