import { isReadonly, shallowReadonly } from '../reactive'

describe('shallowReadonly', () => {
  it('happy path', () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it('warn then call set', () => {
    // readonly 对象调用set 时触发  console.warn 警告
    console.warn = jest.fn()
    const wrapped = shallowReadonly({ foo: 1 })
    wrapped.foo = 2
    expect(console.warn).toHaveBeenCalled()
  })
})
