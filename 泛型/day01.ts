// function identity<Type>(arg: Type): Type {
//   return arg;
// }

// type T = string | number;
// let output = identity<string>("myString"); //输出：myString
// let otherPut = identity<T>("String");
// let otherPut1 = identity<T>(123);
// console.log(otherPut, otherPut1);
/**
 * let output = identity<string>(123);
 * 报错：Argument of type 'number' is not assignable to parameter of type 'string'.
 * 这里声明的类型是字符串泛型类型
 * */

/**
 * 使用泛型类型变量
 * */

// function loggingIdentity<Type>(arg: Type): Type {
//   console.log(arg.length);
//   // Property 'length' does not exist on type 'Type'. 因为arg中不存在 length 属性
//   return arg;
// }

// 写法一：
// function loggingIdentity<Type>(arg: Type[]): Type[] {
//   console.log(arg.length);
//   return arg;
// }

// console.log(loggingIdentity<Array<number>>([]));

// // 写法二：
// function otherLoggingIdentity<Type>(arg: Array<Type>): Array<Type> {
//   console.log(arg.length);
//   return arg;
// }

// console.log(otherLoggingIdentity<Array<number>>([]));

// const T = {
//   length: 0,
// };
// console.log(typeof T); //object
// function otherLoggingIdentity01<T>(arg: typeof T): typeof T {
//   console.log(arg.length);
//   return arg;
// }

// console.log(otherLoggingIdentity01<typeof T>(["12", "23"]));

// function identity<Type>(arg: Type): Type {
//   return arg;
// }

// // let myIdentity: <Type>(arg: Type) => Type = identity;
// let myIdentity = function identity<Type>(arg: Type): Type {
//   return arg;
// };
// console.log(myIdentity);

// 创建一个接口
// interface GenericIdentityFn<Type> {
//   (arg: Type): Type;
// }

// function identity<Type>(arg: Type): Type {
//   return arg;
// }

// let myIdentity: GenericIdentityFn<Number> = identity;

// class 通用类
// class GenericNumber<Type> {
//   zeroValue?: Type;
//   add?: (x: Type, y: Type) => Type;
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function (x, u) {
//   return x + u;
// };

// console.log(myGenericNumber.add(1, 3));
// console.log(myGenericNumber.zeroValue);

// //Generic Constraints 通用约束
// interface Lengthwise {
//   length: number;
// }

// function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
//   console.log(arg.length); // Now we know it has a .length property, so no more error
//   return arg;
// }

// console.log(loggingIdentity<string>("123"))
// console.log(loggingIdentity<Array<number>>([2,3,3,4,5,5,]))

// // Using Type Parameters in Generic Constraints 在泛型约束中使用类型参数
// let x = { a: 1, b: 2, c: 3, d: 4 };

// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   console.log(obj); //{ a: 1, b: 2, c: 3, d: 4 }
//   console.log(key); //a
//   for (let id in obj) {
//     // target[id] = (<Type>obj)[key];
//     console.log((<Type>obj)[id])
//   }
//   return obj[key];
// }

// console.log(typeof getProperty(x, "b")); //number 获取到类型

//Using Class Types in Generics 在泛型中使用类类型
// class BeeKeeper {
//   hasMask: boolean = true;
// }

// class ZooKeeper {
//   nametag: string = "Mikle";
// }

// class Animal {
//   numLegs: number = 4;
// }

// class Bee extends Animal {
//   keeper: BeeKeeper = new BeeKeeper();
// }

// class Lion extends Animal {
//   keeper: ZooKeeper = new ZooKeeper();
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//   return new c();
// }

// console.log(createInstance(Lion).keeper.nametag);

// console.log(createInstance(Bee).keeper.hasMask)

// type Point = { x: number; y: number };
// type P = keyof Point; //type P = keyof Point

// type Arrayish = { [n: number]: unknown };
// type A = keyof Arrayish; //type M =  number

// type Mapish = { [k: string]: boolean };
// type M = keyof Mapish; //type M = string | number
// // 注意，在这个例子中，m 是字符串 | number ー这是因为 JavaScript 对象键总是被强制为字符串，所以 obj [0]总是与 obj [“0”]相同

// typeof 操作符
// --> 增加了一个类型操作符，你可以在类型上下文中使用它来引用变量或属性的类型:
console.log(typeof "1233"); //string
type Predicate = (x: unknown) => boolean; //返回的是 boolean
type K = ReturnType<Predicate>; // 所以 K 的类型是 boolean

function f() {
  return { x: 10, y: 3 };
}
//type P = ReturnType<f>; // 报错 这里 f 是一个数值 不是一个对象
type P = ReturnType<typeof f>; // 输出: type P = { x: number;y: number;}

//  Indexed Access Types 索引访问类型
/**
 * 我的理解是  数组一样的获取值的类型
 * */
//可以使用一个索引访问类型来查找另一个类型上的特定属性:

type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; //那么Age的类型是个 number，type Age = number

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
  { name: "Eve", age: 37, boole: false },
];

type Person01 = typeof MyArray[number]; // 输出：

/**
 *
 * type Person01 = {
 *  name: string;
 *   age: number;
 *   boole?: undefined;
 *  } | {
 *   name: string;
 *   age: string;
 *   boole: boolean;
 * }
 * */

type Person03 = Person01["age"]; // 输出：

type Person02 = typeof MyArray[number]["age"];

