import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'


const myNode1 = h('div', {key: 'text'}, 'text')
const myNode2 = h('div', {key: 'list'}, [
    h('span', {}, '123'),
    h('span', {}, '456')
])
const container = document.getElementById('container')
const button = document.getElementById('button')
console.log('>>>DOM',button)
button.addEventListener('click',() => {
    console.log('>>>index-patch',myNode2, container)
    patch(container, myNode2)
    // button.removeEventListener()
})