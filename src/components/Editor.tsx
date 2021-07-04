import React, { FocusEventHandler, HTMLAttributes, ReactElement } from 'react';
import cx from 'clsx';
import RichUtils from '../classes/RichUtils';
import preventDefault from '../utils/preventDefault';
import preventBodyScroll from '../utils/preventBodyScroll';

interface IProps {
    className?: string;
    inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
    value?: string;
    onChange: (html: string) => void;
    onFocus?: FocusEventHandler;
    onBlur?: FocusEventHandler;
}

const Editor = ({ className, inputMode, value, onChange, onFocus, onBlur }: IProps): ReactElement => (
    <div
        inputMode={inputMode}
        className={cx(className, 'content-editable')}
        translate="no"
        spellCheck={false}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value || '' }}
        onFocus={(event) => {
            if (onFocus) {
                onFocus(event);
            }

            preventBodyScroll(event);
            RichUtils.styleWithCss();
        }}
        onBlur={(event) => {
            if (onBlur) {
                onBlur(event);
            }

            const html = (event.target as HTMLDivElement).innerHTML;

            if (html !== value) {
                onChange(html);
            }
        }}
        onPaste={(event) => {
            preventDefault(event);
            RichUtils.insertText(event.clipboardData.getData('text/plain'));
        }}
    />
);

export default Editor;
