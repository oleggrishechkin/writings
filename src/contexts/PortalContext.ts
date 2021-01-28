import { createContext } from 'react';

const PortalContext = createContext<Node>(document.getElementById('root') || document.body);

export default PortalContext;
