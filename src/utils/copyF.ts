const copyF =
    () =>
    <Type extends Record<string, any> | any[]>(object: Type): Type =>
        Array.isArray(object) ? ([...object] as Type) : { ...object };

export default copyF;
