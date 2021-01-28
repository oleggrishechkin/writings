import isHeaderFormatting from './isHeaderFormatting';

const toggleList = (command: 'insertUnorderedList' | 'insertOrderedList'): void => {
    if (isHeaderFormatting(window.getSelection()?.anchorNode?.parentElement)) {
        document.execCommand('formatBlock', false, '<div>');
    }

    if (document.queryCommandState('justifyCenter') || document.queryCommandState('justifyRight')) {
        document.execCommand('justifyLeft');
    }

    document.execCommand(command);
};

export default toggleList;
