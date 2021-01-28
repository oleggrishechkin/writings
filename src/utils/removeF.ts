import copyF from './copyF';

const removeF =
    <Type>(key: string) =>
    (object: Record<string, Type>): Record<string, Type> => {
        const objectCopy = copyF()(object);

        delete objectCopy[key];

        return objectCopy;
    };

export default removeF;
