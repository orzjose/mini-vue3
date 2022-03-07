import { extend } from '../shared'

let activeEffect
const targetMap = new WeakMap()
class ReactiveEffect {
  private _fn: any
  private scheduler?: () => void
  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    this._fn()
  }
}

export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn)
  extend(_effect, options)
  _effect.run()
}

export function track(target, key) {
  let depMap = targetMap.get(target)
  if (!depMap) {
    depMap = new Map()
    targetMap.set(target, depMap)
  }
  let deps = depMap.get(key)
  if (!deps) {
    deps = new Set()
    depMap.set(key, deps)
  }

  if (!activeEffect) return
  deps.add(activeEffect)
}

export function trigger(target, key) {
  const depMap = targetMap.get(target)
  const deps = depMap.get(key)

  for (const effect of deps) {
    // effect.run()
    effect.scheduler ? effect.scheduler() : effect.run()
  }
}
