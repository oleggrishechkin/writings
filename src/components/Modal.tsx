import { ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';
import Portal from './Portal';

interface IModalProps {
    opened: boolean;
    onClose: () => void;
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
    justify-content: flex-end;
    z-index: 2;
    background: var(--shadow-normal);
    &[data-transition='opening'] {
        background: transparent;
    }
    &[data-transition='close'] {
        background: transparent;
    }
`;

const StyledModal = styled.div`
    background: var(--background);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    max-height: calc(100% - 28px);
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    transition: transform 300ms;
    overflow: hidden;
    &[data-transition='opening'] {
        transform: translate3d(0, 100%, 0);
    }
    &[data-transition='close'] {
        transform: translate3d(0, 100%, 0);
    }
`;

const Modal = ({ opened, onClose, children }: IModalProps): ReactElement => {
    const transition = useTransition(opened, 300);

    return (
        <Portal opened={transition !== 'closed'}>
            <Overlay
                data-transition={transition}
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onClose();
                }}
            >
                <StyledModal
                    data-transition={transition}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                >
                    {children}
                </StyledModal>
            </Overlay>
        </Portal>
    );
};

export default Modal;
