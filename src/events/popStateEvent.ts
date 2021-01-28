import { createEvent } from 'react-tagged-state';

const popStateEvent = createEvent();

window.addEventListener(
    'popstate',
    () => {
        popStateEvent();
    },
    { passive: true }
);

export default popStateEvent;
