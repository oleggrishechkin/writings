import { RefObject, useRef } from 'react';

const useInnerRef = <Type>(innerRef?: RefObject<Type>): RefObject<Type> => {
    const ref = useRef<Type>(null);

    return innerRef || ref;
};

export default useInnerRef;
