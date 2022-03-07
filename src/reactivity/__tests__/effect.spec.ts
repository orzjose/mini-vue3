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

  it('effect scheduler', () => {
    let age
    const observed = reactive({ age: 1 })

    const scheduler = jest.fn(() => {
      age = observed.age + 10
    })

    effect(
      () => {
        age = observed.age
      },
      { scheduler }
    )

    expect(scheduler).not.toHaveBeenCalled()
    expect(age).toBe(1)

    observed.age++

    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(age).toBe(12)

    observed.age++
    expect(scheduler).toHaveBeenCalledTimes(2)
    expect(age).toBe(13)
  })

  it('effect return runner', () => {
    // effect 返回 fn 函数
    let age = 0

    const fn = jest.fn(() => {
      age += 1
      return 'result'
    })
    const runner = effect(fn)

    expect(age).toBe(1)

    const result = runner()
    expect(age).toBe(2);
    expect(result).toBe('result')
  })
})
