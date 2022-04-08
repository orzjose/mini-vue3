import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  if (isObject(vnode.type)) {
    // 处理 component
    processComponent(vnode, container)
  } else if (typeof vnode.type === 'string') {
    // 处理 element
    processElement(vnode, container)
  }
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setUpRenderEffect(instance, container)
}

function setUpRenderEffect(instance, container) {
  const subTree = instance.render()

  patch(subTree, container)
}
function processElement(vnode, container) {
  const el: HTMLElement = document.createElement(vnode.type)
  // attrbuite
  const { props, children } = vnode
  for (const key in props) {
    // vnode.props
    el.setAttribute(key, props[key])
  }

  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    renderChildren(children, el)
  }
  container.append(el)
}
function renderChildren(children, container) {
  children.forEach((vnode) => {
    patch(vnode, container)
  })
}
