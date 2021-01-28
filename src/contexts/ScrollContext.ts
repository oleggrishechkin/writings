import { RefObject, createRef, createContext } from 'react';

const ScrollContext = createContext<RefObject<HTMLElement>>(createRef());

export default ScrollContext;
