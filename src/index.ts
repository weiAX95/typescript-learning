import "reflect-metadata";
import { BasicTypes } from "./examples/1-basic-types";
import { InterfacesAndTypes } from "./examples/2-interfaces-types";
import { Generics } from "./examples/3-generics";
import { Decorators } from "./examples/4-decorators";
import { InterfaceVsType } from "./examples/interface-vs-type";

console.log("\n=== TypeScript 学习示例 ===\n");

console.log("\n1. 基础类型示例");
console.log("-------------------");
BasicTypes.demonstrateBasicTypes();

console.log("\n2. 接口和类型示例");
console.log("-------------------");
InterfacesAndTypes.demonstrateInterfacesAndTypes();

console.log("\n3. 泛型示例");
console.log("-------------------");
Generics.demonstrateGenerics();

console.log("\n4. 装饰器示例");
console.log("-------------------");
Decorators.demonstrateDecorators();

console.log("\n5. Interface vs Type 详解");
console.log("-------------------");
// 由于是异步函数，需要使用 async/await
(async () => {
    await InterfaceVsType.demonstrate();
})();

console.log("\n=== 示例结束 ===\n");
