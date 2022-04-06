import { h } from '../../lib/mini-vue3.esm.js'
export const App = {
  render() {
    return h('div', {}, 'hello')
  },
  setup() {
    return {
      msg: 'hello world'
    }
  }
}
