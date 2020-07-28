import cx from 'clsx';
import { Show } from 'solid-js';
import createTransitionSignal from '../../signals/createTransitionSignal';
import theme from './Page.module.css';

const Page = (props) => {
    const transitionSignal = createTransitionSignal(() => props.opened, 300);

    return (
        <Show when={transitionSignal() !== 'closed'}>
            <main className={cx(theme.page, !props.base && theme[transitionSignal()])}>{props.children}</main>
        </Show>
    );
};

export default Page;
