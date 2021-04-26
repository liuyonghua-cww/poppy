function compute(method, fNUm, sNum) {
    switch (method) {
        case 'plus':
            return fNUm + sNum;
        case 'minus':
            return fNUm - sNum;
        case 'mul':
            return fNUm * sNum;
        case 'div':
            return fNUm / sNum;
        default:
            break;
    }
}
export {
    compute
}
