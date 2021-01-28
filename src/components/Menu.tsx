import { createPortal } from 'react-dom';
import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';
import Content from './Content';

interface IMenuProps {
    opened: boolean;
    onClose: () => void;
    children: any;
}

const Wrapper = styled.div`
    background: var(--black-transparent-persist);
    display: flex;
    flex-direction: column;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: background 300ms;
    width: 100%;
    z-index: 3;
    &[data-transition='opening'] {
        background: transparent;
    }
    &[data-transition='close'] {
        background: transparent;
        position: fixed;
    }
`;
const StyledMenu = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: hidden;
    transition: transform 300ms;
    &[data-transition='opening'] {
        transform: translate3d(0, 100%, 0);
    }
    &[data-transition='close'] {
        transform: translate3d(0, 100%, 0);
    }
`;

const StyledContent = styled(Content)`
    justify-content: flex-end;
    padding: 0.5rem 0;
    > * {
        flex: 0 0 auto;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Menu = ({ opened, onClose, children }: IMenuProps): ReactElement => {
    const transition = useTransition(opened, 300);

    return (
        <Fragment>
            {transition !== 'closed' &&
                createPortal(
                    <Wrapper
                        data-transition={transition}
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            onClose();
                        }}
                    >
                        <StyledMenu data-transition={transition}>
                            <StyledContent>{children}</StyledContent>
                        </StyledMenu>
                    </Wrapper>,
                    document.getElementById('root') || document.body
                )}
        </Fragment>
    );
};

export default Menu;
