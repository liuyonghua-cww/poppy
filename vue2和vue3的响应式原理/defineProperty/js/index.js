// 只配置 value 属性
/*function defineProperty() {
    const _obj = {};

    // 定义单个属性
    /!*Object.defineProperty(_obj, 'a', {
        value: 1
    })*!/

    // 定义多个属性
    Object.defineProperties(_obj, {
        a: {
            value: 1
        },
        b: {
            value: 2
        }
    })
    return _obj;
}
const obj = defineProperty();
obj.a = 5; // 并不能改变a的值，也就属性值不能修改
// console.log(obj);  // {a: 1, b: 2}


// 枚举
for (var key in obj) {
    console.log(key + ':' + obj[key]) // 没有打印结果，也就是说属性不可以枚举
}

// 删除属性
delete obj.a
console.log(obj); // {a: 1, b: 2} 属性不可删除*/


// -------------------------------------------------------------------------------------
// 配置其他属性
/*function defineProperty() {
    const _obj = {};

    // 定义多个属性
    Object.defineProperties(_obj, {
        a: {
            value: 1,
            writable: true,
            enumerable: true,
            configurable: true
        },
        b: {
            value: 2
        }
    })
    return _obj;
}

const obj = defineProperty();
obj.a = 5;
obj.b = 6;
console.log(obj);  // {a: 5, b: 2}


// 枚举
for (var key in obj) {
    console.log(key + ':' + obj[key]) // a:5
}

// 删除属性
delete obj.a
console.log(obj); // {b: 2}*/


// -------------------------------------------------------------------------------------
// getter setter
function defineProperty() {
    var _obj = {};
    var _a = 1;
    Object.defineProperties(_obj, {
        a: {
            get() {
                return _a;
            },
            // v 设置的值
            set(v) {
                _a = v;
                var oP = document.querySelectorAll('p')[0]
                oP.innerHTML = _a;
            }
        },

        b: {

        }
    })
    return _obj
}
var obj = defineProperty();
console.log(obj);


