import { isProxy, isReadonly, readonly } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    // readonly 不能被set
    const origin = { foo: 1 }
    const wrapped = readonly(origin)

    wrapped.foo = 2
    expect(wrapped.foo).toBe(1)
  })

  it('warn then call set', () => {
    // readonly 对象调用set 时触发  console.warn 警告
    console.warn = jest.fn()
    const wrapped = readonly({ foo: 1 })
    wrapped.foo = 2
    expect(console.warn).toBeCalled()
  })

  it('isReadonly', () => {
    const origin = readonly({ age: 1 })
    expect(isReadonly(origin)).toBe(true)
  })

  it('embed readonly', () => {
    const origin = readonly({
      foo: 1,
      bar: { age: 10 }
    })
    expect(isReadonly(origin.bar)).toBe(true)
  })

  it('isProxy', () => {
    const origin = readonly({ age: 1 })
    expect(isProxy(origin)).toBe(true)
  })
})
