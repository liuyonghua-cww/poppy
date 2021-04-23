// return masked string
function maskify(cc) {
    if (cc.length < 4) {
        return cc;
    }
    const _cc = cc.split('');
    for (let i = 0; i < _cc.length - 4; i++) {
        _cc.splice(i, 1, '#');
    }
    return _cc.join('');
}

console.log(maskify('4556364607935616'));

function isIsogram(str){
    if (!str) {
        return true;
    }
    const _str = str.toLocaleLowerCase().split('');
    const strArr = [...new Set(_str)];
    return strArr.length === str.length;
}

function accum(s) {
   const sArr = s.split('');
   sArr.forEach((item, index) => {
       let str = item;
       for (let i = 0; i < index; i ++) {
           str = str + item;
       }
       const str1Arr = str.toLocaleLowerCase().split('');
       str1Arr[0] = str.charAt(0).toUpperCase();
       sArr[index] = str1Arr.join('');
   })
    return sArr.join('-')
}
accum('ZpglnRxqenU');
