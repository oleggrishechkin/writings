import { useCallback, useState } from 'react';

const useToggle = (): { opened: boolean; toggle: () => void; open: () => void; close: () => void } => {
    const [opened, setOpened] = useState(false);
    const toggle = useCallback(() => setOpened((currentOpened) => !currentOpened), []);
    const open = useCallback(() => setOpened(true), []);
    const close = useCallback(() => setOpened(false), []);

    return { opened, toggle, open, close };
};

export default useToggle;
