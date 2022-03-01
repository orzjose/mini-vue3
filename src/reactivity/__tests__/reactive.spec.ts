import { reactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { age: 1 }
    const observed = reactive(origin)
    expect(origin).not.toBe(observed)
    expect(origin.age).toBe(observed.age)
  })
})
