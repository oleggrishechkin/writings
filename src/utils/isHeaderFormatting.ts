const isHeaderFormatting = (element?: null | HTMLElement): boolean => {
    if (!element || !!element.getAttribute('contenteditable')) {
        return false;
    }

    if (element.nodeName === 'H1') {
        return true;
    }

    return isHeaderFormatting(element.parentElement);
};

export default isHeaderFormatting;
