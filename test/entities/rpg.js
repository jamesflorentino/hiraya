import hiraya from '../../hiraya'
const {
  eachKey,
  isObject
} = hiraya.util

export default class RPGCharacter extends hiraya.Entity {
  init(options) {
    super.init()
    options = 'object' === typeof options ? options : {}
    var {
      name,
      stats,
      states
    } = options

    this.name = name

    // stat attributes
    this.addStats(stats)
    this.addStates(states)
}

  addStats(options) {
    if (!isObject(options)) {
      return
    }
    eachKey(options, this.addStat, this)
  }

  addStates(options) {
    if (!isObject(options)) {
      return
    }
    eachKey(options, this.addState, this)
  }

  addState(key, state) {
    this.states.register(String(key), state)
  }

  addStat(key, maxValue) {
    this.stats.add(String(key), parseFloat(maxValue, 10))
  }
}
