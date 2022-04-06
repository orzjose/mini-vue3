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
