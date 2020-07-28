import cx from 'clsx';
import { Portal, Show } from 'solid-js';
import createTransitionSignal from '../../signals/createTransitionSignal';
import Content from '../Content/Content';
import theme from './Menu.module.css';

const Menu = (props) => {
    const transitionSignal = createTransitionSignal(() => props.opened, 300);

    return (
        <Show when={transitionSignal() !== 'closed'}>
            <Portal mount={document.getElementById('root')}>
                <div
                    className={cx(theme.menuWrapper, theme[transitionSignal()])}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        props.onClose();
                    }}
                >
                    <div className={cx(theme.menu, theme[transitionSignal()])}>
                        <Content className={theme.content}>{props.children}</Content>
                    </div>
                </div>
            </Portal>
        </Show>
    );
};

export default Menu;
