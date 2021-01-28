import { ReactElement, useCallback, useRef } from 'react';
import styled from 'styled-components';
import useSavedScroll from '../hooks/useSavedScroll';
import ScrollContext from '../contexts/ScrollContext';
import proxyBodyScroll from '../utils/proxyBodyScroll';

interface IContentProps {
    className?: string;
    name?: string;
    children: any;
}

const Wrapper = styled.section`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-color: var(--gray) transparent;
    scrollbar-width: thin;
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--gray);
        border-radius: 3px;
        width: 6px;
    }
`;

const StyledContent = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: 1rem 0;
    > * {
        flex: 0 0 auto;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

const Content = ({ className, name, children }: IContentProps): ReactElement => {
    const ref = useRef<HTMLElement>(null);
    const [scrollRef, onScroll] = useSavedScroll(name, ref);
    const onFocus = useCallback(() => {
        document.addEventListener(
            'scroll',
            () => {
                proxyBodyScroll(scrollRef?.current);
            },
            { once: true, passive: true }
        );
    }, [scrollRef]);
    const onInput = useCallback(() => {
        window.requestAnimationFrame(() => {
            proxyBodyScroll(scrollRef?.current);
        });
    }, [scrollRef]);

    return (
        <ScrollContext.Provider value={ref}>
            <Wrapper ref={scrollRef} onScroll={onScroll} onFocus={onFocus} onInput={onInput}>
                <StyledContent className={className}>{children}</StyledContent>
            </Wrapper>
        </ScrollContext.Provider>
    );
};

export default Content;
