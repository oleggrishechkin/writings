const isHeader = (element) => {
    if (!element || !!element.getAttribute('contenteditable')) {
        return false;
    }

    if (element.nodeName === 'H1') {
        return true;
    }

    return isHeader(element.parentElement);
};

export const getSelectionStyles = () => ({
    isHeader: isHeader(window.getSelection()?.anchorNode?.parentElement),
    isJustifyLeft: document.queryCommandState('justifyLeft'),
    isJustifyCenter: document.queryCommandState('justifyCenter'),
    isJustifyRight: document.queryCommandState('justifyRight'),
    isUnorderedList: document.queryCommandState('insertUnorderedList'),
    isOrderedList: document.queryCommandState('insertOrderedList'),
    isBold: document.queryCommandState('bold'),
    isItalic: document.queryCommandState('italic'),
    isUnderline: document.queryCommandState('underline')
});

export const toggleHeader = () => {
    if (document.queryCommandState('insertUnorderedList')) {
        document.execCommand('insertUnorderedList');
    }

    if (document.queryCommandState('insertOrderedList')) {
        document.execCommand('insertOrderedList');
    }

    document.execCommand(
        'formatBlock',
        false,
        isHeader(window.getSelection()?.anchorNode?.parentElement) ? '<div>' : '<h1>'
    );
};

const toggleList = (command) => {
    if (isHeader(window.getSelection()?.anchorNode?.parentElement)) {
        document.execCommand('formatBlock', false, '<div>');
    }

    if (document.queryCommandState('justifyCenter') || document.queryCommandState('justifyRight')) {
        document.execCommand('justifyLeft');
    }

    document.execCommand(command);
};

export const toggleUnorderedList = () => toggleList('insertUnorderedList');

export const toggleOrderedList = () => toggleList('insertOrderedList');

export const toggleJustifyLeft = () => {
    document.execCommand('justifyLeft');
};

export const toggleJustifyCenter = () => {
    document.execCommand('justifyCenter');
};

export const toggleJustifyRight = () => {
    document.execCommand('justifyRight');
};

export const toggleBold = () => {
    document.execCommand('bold');
};

export const toggleItalic = () => {
    document.execCommand('italic');
};

export const toggleUnderline = () => {
    document.execCommand('underline');
};
