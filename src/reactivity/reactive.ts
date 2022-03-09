import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers
} from './baseHandles'

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}
export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)
}

function createActiveObject(raw, baseHandles) {
  return new Proxy(raw, baseHandles)
}

export function isReactive(obj) {
  return !!obj[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(obj) {
  return !!obj[ReactiveFlags.IS_READONLY]
}
export function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj)
}
