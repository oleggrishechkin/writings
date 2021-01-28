import { FocusEventHandler, HTMLAttributes, ReactElement, RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import proxyBodyScroll from '../utils/proxyBodyScroll';
import EditorRender from './EditorRender';

interface IEditorProps {
    className?: string;
    placeholder?: string;
    scrollRef?: RefObject<HTMLElement>;
    inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
    value?: string;
    onChange: (html: string) => void;
    onFocus?: FocusEventHandler;
    style?: Record<string, string | number>;
    onBlur?: FocusEventHandler;
}

const StyledEditor = styled(EditorRender)`
    cursor: text;
    user-select: text;
    &:empty:before {
        color: var(--gray);
        content: attr(data-placeholder);
    }
`;

const Editor = ({
    className,
    placeholder,
    scrollRef,
    inputMode,
    value,
    onChange,
    onFocus,
    style,
    onBlur
}: IEditorProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const valueRef = useRef<typeof value>(value || '');
    const onChangeRef = useRef<typeof onChange>(onChange);

    valueRef.current = value || '';
    onChangeRef.current = onChange;

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (ref.current && valueRef.current !== ref.current.innerHTML) {
                event.returnValue = false;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);

            if (ref.current && valueRef.current !== ref.current.innerHTML) {
                onChangeRef.current(ref.current.innerHTML);
            }
        };
    }, []);

    return (
        <StyledEditor
            inputMode={inputMode}
            ref={ref}
            style={style}
            className={className}
            data-placeholder={placeholder}
            translate="no"
            spellCheck={false}
            contentEditable
            value={valueRef.current}
            onFocus={(event) => {
                if (onFocus) {
                    onFocus(event);
                }

                document.addEventListener(
                    'scroll',
                    () => {
                        proxyBodyScroll(scrollRef?.current);
                    },
                    { once: true, passive: true }
                );
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.execCommand('styleWithCss', false, true);
            }}
            onInput={() => {
                window.requestAnimationFrame(() => {
                    proxyBodyScroll(scrollRef?.current);
                });
            }}
            onBlur={(event) => {
                if (onBlur) {
                    onBlur(event);
                }

                if (valueRef.current !== event.target.innerHTML && onChange) {
                    onChange(event.target.innerHTML);
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
