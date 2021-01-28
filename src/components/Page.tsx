import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';

interface IPageProps {
    opened?: boolean;
    base?: boolean;
    children: any;
}

const Overlay = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    transition: background 300ms;
    z-index: 1;
    background: var(--shadow-normal);
    &[data-transition='opening'] {
        background: transparent;
    }
    &[data-transition='close'] {
        background: transparent;
    }
`;

const StyledPage = styled.section`
    background: var(--background);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: hidden;
    transition: transform 300ms, border-radius 300ms;
    &[data-transition='opening'] {
        transform: translate3d(100%, 0, 0);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    &[data-transition='close'] {
        transform: translate3d(100%, 0, 0);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
`;

const Page = ({ opened = false, base = false, children }: IPageProps): ReactElement => {
    const transition = useTransition(opened, 300);

    return (
        <Fragment>
            {transition !== 'closed' && (
                <Overlay data-transition={base ? null : transition}>
                    <StyledPage data-transition={base ? null : transition}>{children}</StyledPage>
                </Overlay>
            )}
        </Fragment>
    );
};

export default Page;
