const proxyBodyScroll = (element?: HTMLElement | null): void => {
    if (document.documentElement.scrollTop !== 0 && !!element) {
        element.scrollTop += document.documentElement.scrollTop;
        document.documentElement.scrollTop = 0;
    }
};

export default proxyBodyScroll;
