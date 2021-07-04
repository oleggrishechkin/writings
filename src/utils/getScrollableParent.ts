const getScrollableParent = (target: Element): Element | null => {
    if (!target || target.scrollHeight > target.clientHeight) {
        return target;
    }

    return getScrollableParent(target.parentNode as Element);
};

export default getScrollableParent;
