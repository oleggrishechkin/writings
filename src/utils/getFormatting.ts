import isHeaderFormatting from './isHeaderFormatting';

export interface IFormatting {
    isHeader: boolean;
    isJustifyLeft: boolean;
    isJustifyCenter: boolean;
    isJustifyRight: boolean;
    isUnorderedList: boolean;
    isOrderedList: boolean;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
}

const getFormatting = (): IFormatting => ({
    isHeader: isHeaderFormatting(window.getSelection()?.anchorNode?.parentElement),
    isJustifyLeft: document.queryCommandState('justifyLeft'),
    isJustifyCenter: document.queryCommandState('justifyCenter'),
    isJustifyRight: document.queryCommandState('justifyRight'),
    isUnorderedList: document.queryCommandState('insertUnorderedList'),
    isOrderedList: document.queryCommandState('insertOrderedList'),
    isBold: document.queryCommandState('bold'),
    isItalic: document.queryCommandState('italic'),
    isUnderline: document.queryCommandState('underline')
});

export default getFormatting;
