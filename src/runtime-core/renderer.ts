import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  console.log(vnode, container)
  // 处理 component
  processComponent(vnode, container)
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
