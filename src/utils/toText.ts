const toText = (html: string): string => {
    const element = document.createElement('div');

    element.innerHTML = html;

    return element.textContent || element.innerText;
};

export default toText;
