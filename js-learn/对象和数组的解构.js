/**
 * 解构数组
 */
console.log('------------------------解构数组------------------------');
// 一维数组
const names = ['Asabeneh', 'Brook', 'David', 'John']
let [firstPerson, secondPerson, thirdPerson, fourthPerson] = names
console.log(firstPerson, secondPerson,thirdPerson, fourthPerson) // Asabeneh Brook David John

// 二维数组
const fullStack = [
    ['HTML', 'CSS', 'JS', 'React'],
    ['Node', 'Express', 'MongoDB']
]
const [frontEnd, backEnd] = fullStack;
console.log(frontEnd); // [ 'HTML', 'CSS', 'JS', 'React' ]
console.log(backEnd); // [ 'Node', 'Express', 'MongoDB' ]

// 使用逗号跳过某一项的解构
const numbers = [1, 2, 3]
let [numONe, , numThree] = numbers
console.log(numONe, numThree); // 1 3

// 如果该索引的数组值未定义，我们可以使用默认值
const names1 = [undefined, 'jack', 'lucy'];
const [
    onePerson = 'john',
    twoPerson,
    threePerson,
    fourPerson = 'xiaoming'
] = names1;
console.log(onePerson, twoPerson, threePerson, fourPerson); // john jack lucy xiaoming

// 使用扩展运算符将剩余的参数解构到一个数组
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const [one, two, three, ...args] = nums;
console.log(one, two, three); // 1 2 3
console.log(args); // [ 4, 5, 6, 7, 8 ]

// 迭代的过程中进行解构
for (const [v1, v2, v3] of fullStack) {
    console.log(v1, v2, v3);
    // HTML CSS JS
    // Node Express MongoDB
}

console.log('------------------------解构对象------------------------');
/**
 * 解构对象
 */
const rectangle = {
    width: 20,
    height: 10,
    area: 200
}
let { width, height, area, perimeter } = rectangle
console.log(width, height, area, perimeter) // 20 10 200 undefined

// 重命名
let { width: w, height: h, area: a, perimeter: p } = rectangle
console.log(w, h, a, p); // 20 10 200 undefined

// 对对象中不存在的key给定默认值
const rectangle1 = {
    width1: 20,
    height1: 10,
    area1: 200
}
let { width1, height1, area1, perimeter1 = 100 } = rectangle1
console.log(width1, height1, area1, perimeter1) // 20 10 200 100

// 对传给函数的实参进行解构
const rect = {
    width: 20,
    height: 10
};
const calculatePerimeter = ({width, height}) => {
    console.log(width + height); // 30
};
calculatePerimeter(rect);

// 跟数组一样，迭代的过程中也可以进行解构

// 对嵌套对象的解构
const person = {
    name: 'jack',
    age: 34,
    car: {
        color: 'red',
        brand: 'BMW'
    }
}
const {name, age, car: { color, brand }} = person;
console.log(name, age, color, brand); // jack 34 red BMW

console.log('------------------------扩展运算符操作数组------------------------');
const frontEnd1 = ['HTML', 'CSS', 'JS', 'React']
const backEnd1 = ['Node', 'Express', 'MongoDB']
const fullStack1 = [...frontEnd1, ...backEnd1]

console.log(fullStack1) // ['HTML', 'CSS', 'JS', 'React', 'Node', 'Express', 'MongoDB']

console.log('------------------------扩展运算符操作对象------------------------');
// 复制（浅拷贝）
const user = {
    name:'Asabeneh',
    title:'Programmer',
    country:'Finland',
    city:'Helsinki'
}

const copiedUser = {...user}
console.log(copiedUser) // {name: 'Asabeneh', title: 'Programmer', country: 'Finland', city: 'Helsinki'}



