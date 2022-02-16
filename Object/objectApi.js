//1.objectIs
const objectIs = (x, y) => {
  if (x === y) {
    //判断x跟y是+0、-0、0三种清空
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // x!==y有可能是两者都是NaN。而NaN!==NaN  即x!==x则说明其本身为NaN
    return x !== x && y !== y; //俩都是NaN
    return isNaN(x) && isNaN(y); //使用现有API
  }
};
// console.log(objectIs(0, -0));
// console.log(objectIs(0, +0));
// console.log(objectIs(-0, -0));
// console.log(objectIs(NaN, 0 / 0));

//2.object类型转换原理
const a = {
  value: 0,

  //1.最先尝试
  // [Symbol.toPrimitive]() {
  //   return 6; //7
  // },

  //2.object上没有Symbol.toPrimitive属性--【对象的Symbol.toPrimitive属性，指向一个方法】，使用valueOf()
  // valueOf() {
  //   return "5"; //'51'
  // },

  //3.对象上没有定义valueOf，尝试toString()
  toString() {
    return ++this.value;
    return (this.value += 1);
  },

  //4.上边三个全部注释掉
  //[object Object]1
};
// console.log(obj + 1);
// console.log(a == 1 && a == 2); //true

//3.手写instanceof
const sInstanceof = (x, y) => {
  //基本数据类型直接返回false
  if (typeof x !== "object" || x === null) return false;
  //查找原型链
  let proto = Object.getPrototypeOf(x);
  while (proto) {
    if (proto === y.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
// console.log(sInstanceof("syh", String)); //false
// console.log(sInstanceof(new String("syh"), String)); //true

//4.instanceof判断基本数据类型
class primitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === "number";
  }
}
// console.log(111 instanceof primitiveNumber); //true

//5.原型链
function Foo() {}
const foo = new Foo();
//5.1
console.log(foo.__proto__ === Foo.prototype);
console.log(Foo.__proto__ === Function.prototype);
console.log(Function.__proto__ === Function.prototype);
console.log(Object.__proto__ === null);
//5.2
console.log(Foo === Foo.prototype.constructor);
console.log();
