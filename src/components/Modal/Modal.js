import cx from 'clsx';
import { Portal, Show } from 'solid-js';
import createTransitionSignal from '../../signals/createTransitionSignal';
import theme from './Modal.module.css';

const Modal = (props) => {
    const transitionSignal = createTransitionSignal(() => props.opened, 300);

    return (
        <Show when={transitionSignal() !== 'closed'}>
            <Portal mount={document.getElementById('root')}>
                <div
                    className={cx(theme.modalWrapper, theme[transitionSignal()])}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        props.onClose();
                    }}
                >
                    <div
                        className={cx(theme.modal, theme[transitionSignal()])}
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </Portal>
        </Show>
    );
};

export default Modal;
