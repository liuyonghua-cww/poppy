defineProperty 劫持数据，给对象进行扩展，属性进行设置
```javascript
// 定义单个属性
defineProperty(
    o: any, // 要定义的对象
    p: PropertyKey, // 定义的属性
    attributes: PropertyDescriptor & ThisType<any>
): any;

// 第三个参数的配置
interface PropertyDescriptor {
    configurable?: boolean; // 可配置可操作的
    enumerable?: boolean; // 可枚举
    value?: any; // 默认值
    writable?: boolean; // 可写
    get?(): any;
    set?(v: any): void;
}


// 定义多个属性
defineProperties(
    o: any, 
    properties: PropertyDescriptorMap & ThisType<any>
): any;

interface PropertyDescriptorMap {
    [s: string]: PropertyDescriptor;
}
```
