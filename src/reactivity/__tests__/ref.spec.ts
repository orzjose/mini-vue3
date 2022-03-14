import { effect } from '../effect'
import { reactive } from '../reactive'
import { ref, isRef, unRef, proxyRefs } from '../ref'

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })
  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    const fn = jest.fn(() => (dummy = a.value))
    effect(fn)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(fn).toHaveBeenCalledTimes(2);
    expect(dummy).toBe(2)
    // same value should not trigger
    a.value = 2
    expect(fn).toHaveBeenCalledTimes(2);
  })

  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  it('isRef', () => {
    const a = ref(1)
    const user = reactive({
      age: 1
    })
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(user)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    expect(unRef(a)).toBe(1)
    expect(unRef(1)).toBe(1)
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'xiaohong'
    }

    const proxy = proxyRefs(user)

    expect(proxy.age).toBe(10) // 自动解引用
    expect(proxy.name).toBe('xiaohong')

    proxy.age = 20
    expect(proxy.age).toBe(20) // 自动修改ref值
    expect(user.age.value).toBe(20)
    proxy.age = ref(30)
    expect(proxy.age).toBe(30) // 自动修改ref值
    expect(user.age.value).toBe(30)
  })
})
