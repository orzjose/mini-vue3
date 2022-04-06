import { render } from './renderer'
import { createVNode } from './vnode'

export function createApp(rootComponent) {
  return {
    mounted(rootContainer) {
      // 先转换成 vnode
      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    }
  }
}
