## 探究js中的this为啥东指西指

js中的this可谓是花样百出，在不同的环境、不同的作用下表现是不同的，下面我们就来探究一下js中this的用法和指向问题

### 1.首先从最简单的开始说，普通的函数中this的指向

```javascript
function test() {
    this.a = 1;
    console.log(this);
    console.log(this.a);
}

test();
```

结果

```javascript
Window
1
```

可以看出this是指向window的，函数中this.a 相当于window.a

但如果在js的严格模式下，可就不一样了，我们在函数中加一段"use strict"

```javascript

function test() {
    'use strict';
    console.log(this);
}

test();
```
结果
```javascript
undefined
```

结果为undefined 所以说在严格模式下，普通函数执行的时候内部this不指向谁

### 2.对象中的方法this指向

```javascript
var obj = {
    a: 1,
    test: function () {
        console.log(this);
        console.log(this.a);
    }
}
obj.test();
```

结果
```javascript
{a: 1, test: ƒ}
1
```
那我们就明确了对象里面的方法是可以通过this访问到对象本身的，从而就可以通过this.** 访问到对象里面的属性和方法

### 3.构造函数中this的指向

```javascript
function Test(a) {
    this.a = a;
    console.log(this.a);
    console.log(window.a);
}

var test = new Test(1);
```

结果
```javascript
1
undefined
```
window.a为undefined，说明在构造函数在被实例化之后，this不会指向window，我们在构造函数中加一句`console.log(this)`  
结果
```javascript
{a: 1}
```
由此可以看构造函数在被实例化之后，其中this指向被实例化出来的对象  
那么构造函数原型上的方法this指向什么呢？  
我们在原型是定义一个方法

```javascript
Test.prototype.say = function () {
    console.log(this.a); // 1
}
test.say();
```

能正常的打印出 a 的值，也就证明了一点：原型上方法内部的this依然指向构造函数实例化出来的对象

### 4.事件处理函数中this的指向

在页面中创建一个按钮

```html
<button id="btn">CLICK</button>
```

当他点击的时候，给它绑定一个事件处理函数

```javascript
var oBtn = document.querySelector('#btn');
oBtn.addEventListener('click', function () {
    console.log(this)
}) 
```

结果
```html
<button id="btn">CLICk</button>
```
由此得出事件处理函数内部的this指向绑定元素的本身

### 5.call/apply/bind 改变this的指向

call：函数名.call(this, arg1, arg2, ...)，第一个参数用来指定函数内部this的指向，后面的参数是函数执行时所需要的实参

```javascript
var obj = {
    a: 1,
    b: 2
}

function test(c, d) {
    console.log(c + ',' + d);
    console.log(this.a);
}

test.call(obj, 10, 100);
```

结果：

```javascript
10, 100
1
```

apply：函数名.call(this, [arg1, arg2, ...])，与call不同的是把实参放到一个数组中传入

```javascript
var obj = {
    a: 1,
    b: 2
}

function test(c, d) {
    console.log(c + ',' + d);
    console.log(this.a);
}

test.apply(obj, [10, 100]);
```

结果：

```javascript
10, 100
1
```

bind：bind用法和call一样，只是他不像call/apply会立即执行，而是返回一个新的函数

```javascript
var obj = {
    a: 1,
    b: 2
}

function test(c, d) {
    console.log(c + ',' + d);
    console.log(this.a);
}

const _test = test.bind(obj, 10, 100);
_test();
```

结果：

```javascript
10, 100
1
```
### 6.箭头函数中this的指向
上面我们说到普通函数可以通过call/apply/bind改变this的指向 ，但是如果在es6的箭头函数中，是否还能像上面一样改变this的指向呢？不妨来试一下

```javascript
var obj = {
    a: 1,
    b: 2
}
var a = 100

const test = () => {
    console.log(this.a);
}
test.call(obj);
```

结果：

```javascript
100
```

发现并没有打印出 1 ，所有得出一个结论：箭头函数忽略任何形式的this指向的改变。  
那么箭头函数中的this到底指向什么呢？我们先看几个例子之后再进行总结： 
* 在一个对象中添加一个方法，这个方法是一个箭头函数
```javascript
var obj = {
    a: 1,
    test: () => {
        console.log(this)
    }
}
obj.test();
```
结果
```javascript
Window // 指向 window
```
由此可以知道箭头函数中的this不是谁绑定就指向谁
* 在对象的一个方法中再定义一个箭头函数，并执行
```javascript
var obj = {
    a: 1,
    test: function () {
        var t = () => {
            console.log(this)
        }
        t();
    }
}
obj.test();
```
结果
```javascript
{a: 1, test: ƒ} // 指向 obj
```
* 对象的方法为一个箭头函数
```javascript
var obj = {
    a: 1,
    test: () => {
        var t = () => {
            console.log(this)
        }
        t();
    }
}
obj.test();
```
结果
```javascript
Window // 指向 window
```
* 在闭包函数中定义一个箭头函数
```javascript
var obj = {
    a: 1,
    test: function () {
        var t1 = function () {
            var t2 = () => {
                console.log(this);
            }
            t2();
        }
        t1();
    }
}
obj.test();
```
结果
```javascript
Window // 指向 window
```
* 再看一个例子
```javascript
var obj = {
    a: 1,
    test: function () {
        var t1 = () => {
            var t2 = () => {
                console.log(this);
            }
            t2();
        }
        t1();
    }
}
obj.test();
```
结果
```javascript
{a: 1, test: ƒ} // 指向 obj
```
由以上几个例子我们可以得出结论：箭头函数的this指向外层作用域的this指向，但是外层不能是箭头函数，也就是说箭头函数this的指向就是外层非箭头函数this的指向
***
**所以我们在分析this的指向的时，不能片面的认为被谁调用就指向谁，还要根据其所处的环境进行进一步分析**

