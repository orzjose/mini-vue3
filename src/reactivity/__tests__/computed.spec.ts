import { computed } from '../computed'
import { reactive } from '../reactive'

describe('computed', () => {
  it('happy path', () => {
    const user = reactive({
      age: 1
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  it('computed cache', () => {
    const user = reactive({ age: 1 })
    const fn = jest.fn(() => {
      return user.age
    })
    const age = computed(fn)
    // 如果不调用 age.value   fn 不会被触发
    expect(fn).not.toBeCalled()
    // 调用 age.value 时 触发执行 fn
    expect(age.value).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1)

    // age.value 值未进行修改的时候, 不触发 fn 回调
    age.value;
    expect(fn).toHaveBeenCalledTimes(1)
    expect(age.value).toBe(1);

    user.age = 2;
    expect(fn).toHaveBeenCalledTimes(1)
    expect(age.value).toBe(2)
  })
})
