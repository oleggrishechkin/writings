class RichUtilsClass {
    private _isHeaderFormatting(element?: null | HTMLElement): boolean {
        if (!element || !!element.getAttribute('contenteditable')) {
            return false;
        }

        if (element.nodeName === 'H1') {
            return true;
        }

        return this._isHeaderFormatting(element.parentElement);
    }

    get isHeader(): boolean {
        return this._isHeaderFormatting(window.getSelection()?.anchorNode?.parentElement);
    }

    toggleHeader(): void {
        if (document.queryCommandState('insertUnorderedList')) {
            document.execCommand('insertUnorderedList');
        }

        if (document.queryCommandState('insertOrderedList')) {
            document.execCommand('insertOrderedList');
        }

        document.execCommand('formatBlock', false, this.isHeader ? '<div>' : '<h1>');
    }

    get isJustifyLeft(): boolean {
        return document.queryCommandState('justifyLeft');
    }

    toggleJustifyLeft(): void {
        document.execCommand('justifyLeft');
    }

    get isJustifyCenter(): boolean {
        return document.queryCommandState('justifyCenter');
    }

    toggleJustifyCenter(): void {
        document.execCommand('justifyCenter');
    }

    get isJustifyRight(): boolean {
        return document.queryCommandState('justifyRight');
    }

    toggleJustifyRight(): void {
        document.execCommand('justifyRight');
    }

    private _toggleList(command: 'insertUnorderedList' | 'insertOrderedList'): void {
        if (this.isHeader) {
            document.execCommand('formatBlock', false, '<div>');
        }

        if (document.queryCommandState('justifyCenter') || document.queryCommandState('justifyRight')) {
            document.execCommand('justifyLeft');
        }

        document.execCommand(command);
    }

    get isUnorderedList(): boolean {
        return document.queryCommandState('insertUnorderedList');
    }

    toggleUnorderedList(): void {
        this._toggleList('insertUnorderedList');
    }

    get isOrderedList(): boolean {
        return document.queryCommandState('insertOrderedList');
    }

    toggleOrderedList(): void {
        this._toggleList('insertOrderedList');
    }

    get isBold(): boolean {
        return document.queryCommandState('bold');
    }

    toggleBold(): void {
        document.execCommand('bold');
    }

    get isItalic(): boolean {
        return document.queryCommandState('italic');
    }

    toggleItalic(): void {
        document.execCommand('italic');
    }

    get isUnderline(): boolean {
        return document.queryCommandState('underline');
    }

    toggleUnderline(): void {
        document.execCommand('underline');
    }

    styleWithCss(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.execCommand('styleWithCss', false, true);
    }

    insertText(text: string): void {
        document.execCommand('insertText', false, text);
    }

    get styles() {
        return {
            isHeader: this.isHeader,
            isJustifyLeft: this.isJustifyLeft,
            isJustifyCenter: this.isJustifyCenter,
            isJustifyRight: this.isJustifyRight,
            isUnorderedList: this.isUnorderedList,
            isOrderedList: this.isOrderedList,
            isBold: this.isBold,
            isItalic: this.isItalic,
            isUnderline: this.isUnderline
        };
    }
}

const RichUtils = new RichUtilsClass();

export default RichUtils;
