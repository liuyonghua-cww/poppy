export const toString = (v) => {
    return Object.prototype.toString.call(v);
};

export const isString = (v) => {
    return toString(v) === '[object String]';
};

export const isObject = (v) => {
    return toString(v) === '[object Object]';
};
