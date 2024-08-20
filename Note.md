# 虚拟DOM、diff算法

**注意：**真实DOM如何变为虚拟DOM属于模板编译原理范畴mustache

diff是发生在虚拟DOM上的。新虚拟DOM和老虚拟DOM进行diff（精细化比较），计算出应该如何最小量更新，最后反映到真正DOM上



## 虚拟节点

### 虚拟节点的属性

```js
{
    children: undefined // 该节点子元素
    data: { props:{},style:{}}
    elm: undefined // 对应的真实DOM节点，为undefined则说明没上树，在 patch 函数执行后才会被赋值
    key: // 节点唯一标识
    sel: "div" // selector 选择器
    text: "I am a box" //
}
```

## h函数：生成虚拟节点vnode

- `h(tag, data, children)`
  - **标签名 (tag)**：一个字符串，表示要创建的 HTML 标签名，例如 `'div'`, `'span'`, `'p'`, `'a'` 等。
  - **属性 (data)**：一个对象，包含了要应用到该节点的属性，例如 `class`, `style`, `id`, `href` 等。
  - **子节点 (children)**：一个数组，包含了该节点的子节点，可以是字符串 (文本内容)，其他虚拟 DOM 节点，或数组 (包含多个子节点)。
    - 子节点内可以嵌套h函数的数组，形成树形结构

## patch函数：diff算法，最小量更新

- **key很重要**，key是这个节点的唯一标识，告诉了diff算法，在更改前后谁是同一节点
- 当定义key时，对原DOM结构进行增删改即可最小量更新
- **如何定义同一节点：选择器相同且key相同**
- 只有是同一个节点，才会进行精细化比较
- 只进行同层比较，不会跨层比较。跨层时不会进行diff，直接删除+新增

### 工作流程

1. 判断oldNode老节点是否为虚拟节点，如果不是，则包装为虚拟节点
2. 判断oldNode和newNode是不是同一个节点
   1. 不是：暴力删除，新增
   2. 是：精细化比较

## 整体流程

1. 通过h函数创建虚拟节点vnode
   1. 
2. 通过patch函数将虚拟DOM渲染到真实DOM中