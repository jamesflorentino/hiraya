import System from './system'

export default class SystemManager {
  constructor() {
    this.list = []
  }

  get(index) {
    return this.list[index]
  }

  add(system) {
    if ('object' !== typeof system) {
      throw new Error(`parameter should implement a system interface`)
    }
    if (!(system instanceof System)) {
      system = new System(system)
    }

    this.list.push(system)
    return this
  }

  each(callback, context) {
    for (var i = 0, len = this.list.length; i < len; i++) {
      callback.apply(context, this.list[i])
    }
  }
}
