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
