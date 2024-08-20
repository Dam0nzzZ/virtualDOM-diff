// 1.版本: 创建元素节点 并且插入到标杆pivot元素前
// 2.版本: 只创建节点, 插入动作在patch中进行
/*
export default function(vnode, pivot) {
    // 将vnode插入到 privot DOM元素之前
    let domNode = document.createElement(vnode.sel)

    if (vnode.text !== '' && (!vnode.children || vnode.children.length === 0)) {
        // 当内部只有文字，无子节点时
        domNode.innerText = vnode.text
        console.log('>>createElement')
        // 将新增虚拟节点添加到原节点之前
        pivot.parentNode?.insertBefore(domNode, pivot)
    }
    console.log(domNode)
}
*/
export default function createElement(vnode) {
    // 判断vnode为真，且selector为真
    if (!!vnode && !!vnode.sel){
        // 通过selector创建真实DOM
        let domNode = document.createElement(vnode.sel)
        // console.log('real DOM', domNode)

        // 当vnode没有子节点时
        if (vnode.text !== '' && (!vnode.children || vnode.children === 0)) {
            domNode.innerText = vnode.text
        } 
        else if (vnode.children.length >= 1) {
            for (let i = 0; i < vnode.children.length; i++ ){
                console.log('>>>> vnode.child', vnode.children[i])
                // 递归 将子节点创建为DOM并添加到父节点domNode中
                domNode.appendChild(createElement(vnode.children[i]))
            }
        }
        // 将真实dom挂载到虚拟dom的element上
        vnode.elm = domNode
        return domNode

    }
}