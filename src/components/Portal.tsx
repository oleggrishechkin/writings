import { createPortal } from 'react-dom';
import { ReactElement, Fragment } from 'react';

interface IPortalProps {
    opened?: boolean;
    children: any;
}

const Portal = ({ opened, children }: IPortalProps): ReactElement => (
    <Fragment>{!!opened && createPortal(children, document.getElementById('root') || document.body)}</Fragment>
);

export default Portal;
