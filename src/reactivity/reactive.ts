import { mutableHandlers, readonlyHandlers } from './baseHandles'

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

function createActiveObject (raw, baseHandles) {
  return new Proxy(raw, baseHandles);
}