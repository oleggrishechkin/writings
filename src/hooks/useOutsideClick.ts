import { RefObject, useEffect, useRef } from 'react';

const useOutsideClick = <Type extends HTMLElement>(onOutsideClick: (event: MouseEvent) => void): RefObject<Type> => {
    const ref = useRef<Type>(null);

    useEffect(() => {
        if (onOutsideClick) {
            const handleClick = (event: MouseEvent) => {
                if (!!ref.current && !ref.current.contains(event.target as Element)) {
                    onOutsideClick(event);
                }
            };

            window.addEventListener('click', handleClick, { passive: true });

            return () => {
                window.removeEventListener('click', handleClick);
            };
        }
    }, [onOutsideClick]);

    return ref;
};

export default useOutsideClick;
