import vnode from "./vnode";
import createElement from "./createElement";

export default function(oldVnode,newVnode) {
    // 1. 判断第一个传入的节点是否为真实DOM
    console.log('>>>',oldVnode)
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 传入DOM为真实DOM，需要包装为虚拟DOM
        // console.log('>>>patch', oldVnode)
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], oldVnode.textContent, oldVnode)
    }
    
    // 2. 判断是否为同一节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log('same Vnode')
        //1. 判断是否指向内存中同一对象
        if (oldVnode === newVnode) return
        //2. 判断newVode是否存在text
        if (newVnode.text && (!newVnode.children || newVnode.children?.length === 0)) {
            console.log('>>>same text')
            oldVnode.elm.innerText = newVnode.text
        } else {
            // 新节点有children

            // 当老节点有text时
            if (oldVnode.sel && oldVnode.text && (!oldVnode.children || oldVnode.children?.length === 0)) {
                oldVnode.elm.innerHTML = ''
                for(let i = 0; i < newVnode.children.length; i++) {
                    oldVnode.elm.parentNode.appendChild(createElement(newVnode.children[i]))
                }
            }
            // 当老节点也有children 
            else {
                //新增节点
                // un用于存储从0开始的、未处理的、已存在的老节点
                let unhandle = 0
                for(let i = 0; i < newVnode.children.length; i++) {
                    let isExist = false
                    let j = 0
                    for(j = 0; j < oldVnode.children.length; j++) {
                        if (newVnode.children[i].sel === oldVnode.children[j].sel 
                            && newVnode.children[i].key === oldVnode.children[j].key) {
                            isExist = true
                            // console.log('>> find nodes',newVnode.children[i],oldVnode.children[j])
                            break;
                        }
                    }
                    // 找到老节点中不存在的子节点
                    if (!isExist) {
                        console.log('>>> find not exist',i,j,unhandle)
                        let addDom = createElement(newVnode.children[i])
                        newVnode.children[i].elm = addDom
                        // new中指针为i，old为j，new找到old中不存在的新节点的index，这里是新节点本应该插入的地方
                        // oldVnode.children
                // #Ques: 为什么插入了元素oldVnode后，仍是在unhandle不变的index之前插入？
                        if (unhandle < oldVnode.children.length) {
                            oldVnode.elm.insertBefore(addDom, oldVnode.children[unhandle].elm)
                        } else {
                            oldVnode.elm.appendChild(addDom)
                        }
                    } else {
                        unhandle++
                        // 处理当节点存在、但位置不一样的情况
                    }
                }
            }
        }
    } else {
        // 两个不同节点
        // console.log('different Vnode')
        // 创建新DOMnode。挂载到老节点之前，再把老节点删除
        const newDomNode = createElement(newVnode)
        if (oldVnode.elm.parentNode && newDomNode) {
            oldVnode.elm.parentNode?.insertBefore(newDomNode, oldVnode.elm)
            oldVnode.elm.parentNode?.removeChild(oldVnode.elm)
        }
    }
}