import { useCallback, useMemo, useState } from 'react';

export interface IMenu {
    opened: boolean;
    open: () => void;
    close: () => void;
}

const useMenu = (): IMenu => {
    const [opened, setOpened] = useState(false);
    const open = useCallback(() => setOpened(true), []);
    const close = useCallback(() => setOpened(false), []);

    return useMemo(() => ({ opened, open, close }), [close, open, opened]);
};

export default useMenu;
