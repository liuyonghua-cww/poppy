// function test() {
// 	return a;
// 	a = 1;
// 	function a() {};
// 	var a = 2;
// }
//
// console.log(test());
//
// const sum = (function(a, b) {
// 	return a + b;
// })(1, 2);
// console.log(sum);
//
// const log1 = function t1() {
// 	console.log(1);
// }();
//
// const t2 = (1, 2 + 3);
// console.log(t2);
//
// function t3() {
// 	var arr = []
// 	for (var i = 0; i < 10; i++) {
// 		arr[i] = function () {
// 			console.log(i);
// 		}
// 	}
// 	return arr;
// }
// var t4 = t3();
// for (var j = 0; j < 10; j++) {
// 	t4[j]();
// }
// var a = 10;
// if (function b() {}) {
// 	a += typeof (b)
// }
// console.log(a);

// ------------------原型、原型链
// class Phone {
// 	name = 'jack';
// 	age = 18;
//
// 	constructor(props) {
// 		this.address = props.address;
// 	}
//
// }
// Phone.prototype.sex = 'man'
//
// console.log(Phone.prototype); // 原型 prototype是构造函数的一个属性；prototype属于每一个实例化出来的对象，实例化出来的对象的__proto__指向构造函数的prototype
// const phone = new Phone({address: 'beijing'})
// console.log(phone.__proto__);
// console.log(Phone.prototype.constructor); // [class Phone] 原型上的constructor指向class本身

// ------------------apply、 call
// class Test1 {
// 	constructor() {
// 	}
// 	plus() {
// 		console.log('plus');
// 	}
// 	minus() {
//
// 	}
// }
// Test1.prototype.name = 'test1';
// class Test2 extends Test1{
// 	constructor() {
// 		super()
// 	}
// 	mul() {
//
// 	}
// 	div() {
//
// 	}
// }
// var t2 = new Test2();
// t2.plus();
// console.log(t2.name);
// function Test1() {
//
// 	this.plus = function () {
// 		console.log(this)
// 		console.log(this.name);
// 	}
// }
// function Test2() {
// 	Test1.apply(this);
// 	this.name = '1';
// 	this.mul = function () {
//         console.log(this)
// 	}
// }
// var test1 = new Test1();
// var test2 = new Test2();
// test1.plus();
// test2.mul();
// test1.plus.call(test2);

// --------------继承
// region
// 圣杯模式
/*function Teacher() {
	this.name = 'Mr.li'
	this.tSkill = 'Java'
}
Teacher.prototype = {
	pSkill: 'JS/JQ'
}

function Student() {
	this.name = 'Mr.Wang'
}

function Buffer() {
	this.age1 = 18;
}
Buffer.prototype = Teacher.prototype;
var buffer = new Buffer();

Student.prototype = buffer;
Student.prototype.age = 18;

var s = new Student();
console.log(s);*/
// endregion

// 企业级对象继承
/*var inherit = (function () {
    var Buffer = function () {};
    return function (target, origin) {
        Buffer.prototype = origin.prototype;
        target.prototype = new Buffer();
        target.prototype.constructor = target;
        target.prototype.super_class = origin;
    }
})();*/


