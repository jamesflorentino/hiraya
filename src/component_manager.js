import Component from './component'

export default class ComponentManager {
  constructor() {
    this.components = {}
  }

  get(name) {
    return this.components[name]
  }

  add(name, component) {
    if ('object' !== typeof component) {
      throw new Error(`${name} must be an object or instance of a componennt`)
    }
    if (!(component instanceof Component)) {
      component = new Component(component)
    }
    this.components[name] = component
  }

  remove(name) {
    delete this.components[name]
  }
}

