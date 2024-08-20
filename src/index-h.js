import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    // h
  } from "snabbdom";
import h from './mysnabbdom/h'
  /*
  const patch = init([
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule // attaches event listeners
  ]);
  
  const container = document.getElementById("container");
  
  const vnode = h(
    "div#container.two.classes",
    { on: { click: () => console.log("div clicked") } },
    [
      h("span", { style: { fontWeight: "bold" } }, "This is bold"),
      " and this is just normal text",
      h("a", { props: { href: "/foo" } }, "I'll take you places!")
    ]
  );
  // Patch into empty DOM element – this modifies the DOM as a side effect
  patch(container, vnode);
  
  const newVnode = h(
    "div#container.two.classes",
    { on: { click: () => console.log("updated div clicked") } },
    [
      h(
        "span",
        { style: { fontWeight: "normal", fontStyle: "italic" } },
        "This is now italic type"
      ),
      " and this is still just normal text",
      h("a", { props: { href: "/bar" } }, "I'll take you places!")
    ]
  );
  // Second `patch` invocation
  patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
  */
  // 创建patch函数
  // const patch = init({
  //   modules: [classModule, propsModule, styleModule, eventListenersModule],
  // }) 
  const patch = init([classModule, propsModule, styleModule, eventListenersModule])
  // 创建虚拟节点
  const myVnode1 = h("div", { 
    on: { click: () => console.log("div clicked") }, 
  },'123123')

  const myVnode2 = h("a", {
    props: {
      href: 'https://www.google.com',
      target: '_blank'
    }
  }, 'google')

  const myVnode3 = h("div", {
    props: {
      href: 'https://www.google.com',
      target: '_blank'
    }
  }, [
    h('a', {}, 'google'), 
    h('a', {}, 'baidu'),
    h('div', {}, [
      h('span', {}, '123'),
      h('div', {}, h('span', {}, '456'))
    ])
  ])
  console.log(myVnode3)
  // 虚拟节点上树
  const container = document.getElementById("container")
  // 问题：patch函数的第一个参数不能为空
  // patch(container, myVnode1)
  // patch(container, myVnode1 || document.createElement('div'))
  // patch(container, myVnode2)
  patch(container, myVnode3)
