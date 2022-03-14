import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffects, triggerEffects } from './effect'
import { reactive } from './reactive'

class RefImpl {
  private _value: any
  private deps
  private rawValue
  public __v_isRef = true
  constructor(value) {
    this.rawValue = value
    this._value = convert(value)
    this.deps = new Set()
  }
  get value() {
    isTracking() && trackEffects(this.deps)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(newValue, this.rawValue)) {
      this._value = newValue
      this.rawValue = convert(newValue)
      triggerEffects(this.deps)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}
export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      // 如果是 ref 对象， 返回 ref.value
      // 不是 ref 对象，返回本身
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      // 如果修改的对象是 ref 类型 && 传入的值不是 ref 类型，  将源对象 .value 替换
      if (isRef(target[key]) && !isRef(value)) {
        return Reflect.set(target[key], 'value', value)
      } else {
        // 如果修改的对象是 ref 类型 && 传入的对象也是ref 类型， 直接将对象替换掉
        return Reflect.set(target, key, value)
      }
    }
  })
}
