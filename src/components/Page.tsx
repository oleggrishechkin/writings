import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';

interface IPageProps {
    opened?: boolean;
    base?: boolean;
    children: any;
}

const StyledPage = styled.main`
    background: var(--black);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 300ms;
    width: 100%;
    z-index: 1;
    &[data-transition='opening'] {
        transform: translate3d(100%, 0, 0);
    }
    &[data-transition='close'] {
        transform: translate3d(100%, 0, 0);
    }
`;

const Page = ({ opened = false, base = false, children }: IPageProps): ReactElement => {
    const transition = useTransition(opened, 300);

    return (
        <Fragment>
            {transition !== 'closed' && <StyledPage data-transition={base ? null : transition}>{children}</StyledPage>}
        </Fragment>
    );
};

export default Page;
