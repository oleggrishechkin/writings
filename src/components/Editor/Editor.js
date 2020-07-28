import cx from 'clsx';
import { onCleanup } from 'solid-js';
import theme from './Editor.module.css';

const Editor = (props) => {
    let ref;
    const checkChanges = (element) => (props.plainText ? element.innerText : element.innerHTML) !== (props.value || '');
    const handleBeforeUnload = (event) => {
        if (checkChanges(ref)) {
            event.returnValue = false;
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    onCleanup(() => {
        if (checkChanges(ref) && props.onChange) {
            props.onChange({ html: ref.innerHTML, text: ref.innerText });
        }

        window.removeEventListener('beforeunload', handleBeforeUnload);
    });

    return (
        <div
            inputMode={props.inputMode}
            ref={ref}
            style={props.style}
            className={cx(props.className, theme.editor)}
            data-placeholder={props.placeholder}
            translate="no"
            spellCheck={false}
            contentEditable
            innerHTML={props.value || ''}
            onFocus={(event) => {
                if (props.onFocus) {
                    props.onFocus(event);
                }

                document.addEventListener(
                    'scroll',
                    () => {
                        if (document.documentElement.scrollTop !== 0 && !!props.scrollRef) {
                            props.scrollRef.scrollTop += document.documentElement.scrollTop;
                            document.documentElement.scrollTop = 0;
                        }
                    },
                    { once: true, passive: true }
                );
                document.execCommand('styleWithCss', false, true);
            }}
            onInput={() => {
                window.requestAnimationFrame(() => {
                    if (document.documentElement.scrollTop !== 0 && !!props.scrollRef) {
                        props.scrollRef.scrollTop += document.documentElement.scrollTop;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }}
            onBlur={(event) => {
                if (props.onBlur) {
                    props.onBlur(event);
                }

                if (checkChanges(event.target) && props.onChange) {
                    props.onChange({ html: event.target.innerHTML, text: event.target.innerText });
                }
            }}
            onPaste={(event) => {
                event.preventDefault();
                document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
            }}
        />
    );
};

export default Editor;
