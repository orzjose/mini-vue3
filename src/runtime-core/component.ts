export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
  }
  return component
}

export function setupComponent(instance) {
  // TODO initProps
  // TODO initSlots

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const Component = instance.type

  const { setup } = Component
  if (setup) {
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  //   TODO 实现 setupResult == function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentState(instance)
}

function finishComponentState(instance) {
  const Component = instance.type
  if (Component.render) {
    instance.render = Component.render
  }
}
