import vnode from "./vnode"

/*
h函数：生成虚拟节点vnode
1: h(sel,data,string)
2: h(sel,data,[child1,child2,child3])
3: h(sel,data,h(...))
*/
export default function h(sel, b = undefined, c) {
    // b为data。 c为可能的text 或 children,为数组或h()
    let children = undefined
    let data = undefined
    let text = undefined
    let elm = undefined
    // if (arguments.length !== 3) {
    //     console.error('ERROR! h() required 3 arguments!')
    // }
    if (b !== undefined) {
        data = b
    }

    if (typeof c === 'number' || typeof c === 'string') {
        text = c
    } else if (Array.isArray(c)) {
        children = []
        for (let i = 0; i < c.length; i++) {
            if (typeof c[i] === 'object' && c[i].hasOwnProperty('sel')) {
                console.log(c[i])
                children.push(c[i])
            } else {
                console.error('ERROR!!')
            }
        }
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        children = [c]
    }
    return vnode(sel, data, children, text, elm)
}