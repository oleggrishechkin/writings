import { ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';
import Portal from './Portal';

interface IMenuProps {
    opened: boolean;
    onClose: () => void;
    children: any;
}

const Overlay = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: background 300ms;
    width: 100%;
    justify-content: flex-end;
    z-index: 3;
`;

const StyledMenu = styled.div`
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    transition: transform 300ms;
    padding: 0.5rem 0;
    &[data-transition='opening'] {
        transform: translate3d(0, 100%, 0);
    }
    &[data-transition='close'] {
        transform: translate3d(0, 100%, 0);
    }
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
        <Portal opened={transition !== 'closed'}>
            <Overlay
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onClose();
                }}
            >
                <StyledMenu data-transition={transition}>{children}</StyledMenu>
            </Overlay>
        </Portal>
    );
};

export default Menu;
