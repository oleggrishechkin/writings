import cx from 'clsx';
import { onCleanup } from 'solid-js';
import theme from './Content.module.css';
import scroll from './scroll';

const Content = (props) => {
    let ref;
    let animationId;
    const scrollTop = scroll[props.name];

    if (scrollTop) {
        const step = () => {
            if (!!ref && ref.scrollHeight - ref.clientHeight >= scrollTop) {
                ref.scrollTop = scrollTop;

                return;
            }

            animationId = window.requestAnimationFrame(step);
        };

        step();
    }

    onCleanup(() => window.clearTimeout(animationId));

    return (
        <section
            ref={(el) => {
                ref = el;

                if (props.ref) {
                    props.ref(el);
                }
            }}
            className={theme.contentScroll}
            onScroll={(event) => {
                if (!props.name) {
                    return;
                }

                if (event.target.scrollTop) {
                    scroll[props.name] = event.target.scrollTop;

                    return;
                }

                delete scroll[props.name];
            }}
        >
            <div className={cx(props.className, theme.content)}>{props.children}</div>
        </section>
    );
};

export default Content;
