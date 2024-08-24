import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'
import createElement from './mysnabbdom/createElement'


const myNode1 = h('div', {key: 'list'}, 'text')
const myNode3 = h('div', {key: 'text'}, 'newText')
const myNode2 = h('div', {key: 'list'}, [
    h('span', {}, '123'),
    h('span', {}, '456'),
    h('ul', {}, [
        h('li', {}, '1'),
        h('li', {}, '2')
    ])
])
const myNode4 = h('ul', {key: 'list'}, [
    h('li', {key: 1}, 1),
    h('li', {key: 2}, 2)
])
const myNode5 = h('ul', {key: 'list'}, [
    h('li', {key: 1}, 1),
    h('li', {key: 3}, 3),
    h('li', {key: 4}, 4),
    h('li', {key: 2}, 2),
    h('li', {key: 5}, 5),

])
const container = document.getElementById('container')
const button = document.getElementById('button')
button.parentNode.appendChild(createElement(myNode4))
console.log('>>>DOM',button)
button.addEventListener('click',() => {
    patch(myNode4, myNode5)
    // button.removeEventListener()
})