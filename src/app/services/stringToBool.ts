const stringToBool = (_s: string): boolean => {
    return _s.toString().toLowerCase() === 'true';
};

export { stringToBool };