import { extend } from '../shared'

let activeEffect
const targetMap = new WeakMap()
class ReactiveEffect {
  private _fn: any
  public scheduler?: () => void
  public onStop?: () => void
  active = true
  deps: [] = []
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.onStop && this.onStop()
      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect)
  })
}

export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn)
  extend(_effect, options)
  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
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
  if (deps.has(activeEffect)) return
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

export function trigger(target, key) {
  const depMap = targetMap.get(target)
  const deps = depMap.get(key)

  for (const effect of deps) {
    effect.scheduler ? effect.scheduler() : effect.run()
  }
}

export function stop(runner) {
  runner.effect.stop()
}
