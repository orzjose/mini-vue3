import { h } from '../../lib/mini-vue3.esm.js'
export const App = {
  render() {
    console.log(this, 'this');
    return h(
      'div',
      {
        class: [1, 2, 3, 4, 5]
      },
      [h('p', { class: 'red' }, '1234'), h('p', { class: 'blue' }, '4567')]
    )
  },
  setup() {
    return {
      msg: 'hello world'
    }
  }
}
