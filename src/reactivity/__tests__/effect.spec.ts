import { effect, stop } from '../effect'
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
    expect(age).toBe(2)
    expect(result).toBe('result')
  })

  it('effect stop', () => {
    let dummy
    const obj = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })

    obj.prop = 2
    expect(dummy).toBe(2)
    // 执行 stop(runner) 将 effect 内部响应式对象移除
    stop(runner)

    obj.prop++;
    expect(dummy).toBe(2)

    runner()
    expect(dummy).toBe(3)
  })

  it('effect onStop', () => {
    // 当用户传入 onStop 时，调用 stop(runner) 会触发执行 onStop
    let dummy
    const obj = reactive({ prop: 1 })
    const onStop = jest.fn(() => {})
    const runner = effect(
      () => {
        dummy = obj.prop
      },
      { onStop }
    )

    expect(onStop).not.toHaveBeenCalled()
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
