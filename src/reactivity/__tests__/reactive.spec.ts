import { isProxy, isReactive, reactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { age: 1 }
    const observed = reactive(origin)
    expect(origin).not.toBe(observed)
    expect(origin.age).toBe(observed.age)
  })

  it('reactive isReactive', () => {
    // isReactive
    const observed = reactive({ age: 1 })
    expect(isReactive(observed)).toBe(true)
  })

  it('reactive embed', () => {
    const observed = reactive({
      foo: 1,
      bar: { age: 10 }
    })
    expect(isReactive(observed.bar)).toBe(true)
  })

  it('reactive isProxy', () => {
    const observed = reactive({
      foo: 1,
      bar: { age: 10 }
    })
    expect(isProxy(observed)).toBe(true)
    expect(isProxy(observed.bar)).toBe(true)
  })
})
