/*class Test {
    constructor() {
        // 类的非静态方法 -> new 的时候直接放在 this 中的
        this.test = function () {
            console.log('none-static:' + this);
        }
    }

    // 类的静态方法 -> Test.prototype{...}
    // new 的时候 this -> {} -> __proto__ -> Test.prototype{...}
    test() {
        console.log('static:' + this);
    }
}*/

// const test = () => {
//     console.log(this);
// }
// test();
//
// const test1 = () => {
//     'use strict';
//     console.log(this);
// }
// test1();

// var obj = {
//     a: 1,
//     b: 2
// }
// var a = 100
//
// const test = () => {
//     console.log(this.a);
// }
// test.call(obj);

(function () {
    console.log(this)
})()

