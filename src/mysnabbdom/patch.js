import vnode from "./vnode";
import createElement from "./createElement";

export default function(oldVnode,newVnode) {
    // 1. 判断第一个传入的节点是否为真实DOM
    console.log('>>>',oldVnode)
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 传入DOM为真实DOM，需要包装为虚拟DOM
        console.log('>>>patch', oldVnode)
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], oldVnode.textContent, oldVnode)
    }
    
    // 2. 判断是否为同一节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log('same Vnode')
    } else {
        console.log('different Vnode')
        const newDomNode = createElement(newVnode)
        oldVnode.elm.parentNode?.insertBefore(newDomNode, oldVnode.elm)
        oldVnode.elm.parentNode?.removeChild(oldVnode.elm)
    }
}