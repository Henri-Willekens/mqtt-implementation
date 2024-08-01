const stringToBool = (s: string): boolean => {
    return s.toString().toLowerCase() === 'true';
};

export { stringToBool };