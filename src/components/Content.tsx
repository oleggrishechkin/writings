import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import useSavedScroll from '../hooks/useSavedScroll';

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

const Content = forwardRef<HTMLElement, IContentProps>(({ className, name, children }, ref) => {
    const [scrollRef, onScroll] = useSavedScroll(name, ref as RefObject<HTMLElement>);

    return (
        <Wrapper ref={scrollRef} onScroll={onScroll}>
            <StyledContent className={className}>{children}</StyledContent>
        </Wrapper>
    );
});

export default Content;
