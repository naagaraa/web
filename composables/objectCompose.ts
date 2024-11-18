interface Data {
    [key: string]: any;
}

export const isEmptyObject = (obj: Data): boolean => {
    return Object.keys(obj).length === 0;
};