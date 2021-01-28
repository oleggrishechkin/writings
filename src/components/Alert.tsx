import { ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';
import Portal from './Portal';

interface IAlertProps {
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
    justify-content: center;
    z-index: 3;
`;

const StyledAlert = styled.div`
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    transition: opacity 300ms, transform 300ms;
    padding: 0.5rem 0;
    &[data-transition='opening'] {
        opacity: 0;
        transform: scale(0.5);
    }
    &[data-transition='close'] {
        opacity: 0;
        transform: scale(0.5);
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

const Menu = ({ opened, onClose, children }: IAlertProps): ReactElement => {
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
                <StyledAlert data-transition={transition}>{children}</StyledAlert>
            </Overlay>
        </Portal>
    );
};

export default Menu;
