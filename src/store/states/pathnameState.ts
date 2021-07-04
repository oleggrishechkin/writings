import { createState } from 'react-tagged-state';
import popStateEvent from '../events/popStateEvent';

const getInitialState = () => window.location.pathname;

const pathnameState = createState(getInitialState());

popStateEvent``(() => {
    pathnameState(getInitialState());
});

export default pathnameState;
