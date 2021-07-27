// 把下划线命名转成大驼峰命名
function toCamelCase(string) {
    const arr = string.split('_');
    const str = arr.map(item => item.charAt(0).toUpperCase() + item.substring(1)).join('')
    console.log(str);
}
// toCamelCase('a_c_def')


// 字符串大小写切换
function caseConvert(string) {
    const arr = string.split('');
    const _arr = arr.map(item => {
        if (typeof item === 'string') {
            if (item === item.toUpperCase()) {
                return item.toLowerCase();
            }
            if (item === item.toLowerCase()) {
                return item.toUpperCase();
            }
        }
        else {
            return item
        }
    })
    console.log(_arr);
}
// caseConvert('AsA33322A2aa')

function substrCount(str, target) {
    const reg = new RegExp(target, 'g');
    const arr = str.match(reg);
    console.log(arr.length);
}
substrCount('abcdef abcdef a', 'abc')
