const combine =
    (...funcs: Array<(...args: any[]) => any>) =>
    (...args: any[]): void => {
        funcs.forEach((func) => {
            func(...args);
        });
    };

export default combine;
