const preventDefault = (event: any): void => {
    event.stopPropagation();
    event.preventDefault();
};

export default preventDefault;
