import { createPortal } from 'react-dom';
import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import useTransition from '../hooks/useTransition';

interface IModalProps {
    opened: boolean;
    onClose: () => void;
    children: any;
}

const Wrapper = styled.div`
    background: var(--black-transparent-persist);
    display: flex;
    flex-direction: column;
    height: calc(100% - 23px);
    left: 0;
    overflow: hidden;
    padding-top: 23px;
    position: absolute;
    top: 0;
    transition: background 300ms;
    width: 100%;
    z-index: 2;
    &[data-transition='opening'] {
        background: transparent;
    }
    &[data-transition='close'] {
        background: transparent;
    }
`;

const StyledModal = styled.div`
    background: var(--black);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
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

const Modal = ({ opened, onClose, children }: IModalProps): ReactElement => {
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
                        <StyledModal
                            data-transition={transition}
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                            }}
                        >
                            {children}
                        </StyledModal>
                    </Wrapper>,
                    document.getElementById('root') || document.body
                )}
        </Fragment>
    );
};

export default Modal;
