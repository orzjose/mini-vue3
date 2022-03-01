import { effect } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
  it('happy path', () => {
    let age
    const observed = reactive({ age: 1 })

    effect(() => (age = observed.age))

    expect(age).toBe(1)
    observed.age = 2
    expect(age).toBe(2)
  })
})
