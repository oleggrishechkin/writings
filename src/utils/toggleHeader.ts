import isHeaderFormatting from './isHeaderFormatting';

const toggleHeader = (): void => {
    if (document.queryCommandState('insertUnorderedList')) {
        document.execCommand('insertUnorderedList');
    }

    if (document.queryCommandState('insertOrderedList')) {
        document.execCommand('insertOrderedList');
    }

    document.execCommand(
        'formatBlock',
        false,
        isHeaderFormatting(window.getSelection()?.anchorNode?.parentElement) ? '<div>' : '<h1>'
    );
};

export default toggleHeader;
