import State from './state'
/**
 * description of this class
 * @class FiniteStateMachine
 * @constructor
 */
export default class FiniteStateMachine {

  constructor() {
    /**
     * Key pair of state names and functions
     * @property states
     * @type {object}
     */
    this.states = {}

    /**
     * A list of stacked states
     * @property stack
     * @type {Array}
     */
    this.stack = []

    /**
     * currently active state
     * @type {String}
     */
    this.active = null

    this.add('default', new State())

  }

  get(name) {
    return this.states[name]
  }

  getActive(name) {
    if (this.stack.indexOf(name) === -1) {
      return
    }
    return this.states[name]
  }

  /**
   * Registers a state into the state machine
   * @method add
   * @param {string} name name of the state
   * @param {Function|Object} logic logic of the state
   * @deprecated
   */
  add(name, logic) {
    if ('object' === typeof logic) {
      if ('function' !== typeof logic.update) {
        throw new Error(`a state object must have an .update() method`)
      }
    } else if ('function' !== typeof logic) {
      throw new Error(`a state must at least be a function`)
    }

    this.states[name] = logic
    return this
  }

  /**
   * @method register
   * @param {string} name name of the state
   * @param {Function|Object} logic logic of the state
   * @deprecated
   * @chainable
   */
  register(name, logic) {
    if ('object' === typeof logic) {
      if ('function' !== typeof logic.update) {
        throw new Error(`a state object must have an .update() method`)
      }
    } else if ('function' !== typeof logic) {
      throw new Error(`a state must at least be a function`)
    }

    this.states[name] = logic
    return this
  }

  /**
   * Adds a registered state to the stack
   * @method push
   * @param {string} name name of the registered state to be stacked
   * @param {Object} context
   */
  push(name, data) {
    var state = this.states[name]
    if (!state) {
      throw new Error(`${name} is not a valid registered state`)
    }
    if (this.active === name) {
      return
    }
    this.stack.push(name)
    if (state instanceof State) {
      state.enter(data)
    }
    this.active = name
  }

  /**
   * @method pop
   * @param {String} name
   */
  pop(name) {
    if ('string' !== typeof name) {
      this.stack.pop()
    } else {
      var index = this.stack.indexOf(name)
      if (index > -1) {
        this.stack.splice(index, 1)
        var state = this.states[name]
        if (state instanceof State) {
          state.exit()
        }
      }
    }
    this.active = this.stack[this.stack.length-1]
  }

  /**
   * update
   * @method update
   */
  update() {
    for (var i = 0, len = this.stack.length; i < len; i++) {
      var name = this.stack[i]
      var state = this.states[name]
      if (!state) {
        throw new Error(`"${name}" state name is not registered`)
      }

      if ('object' === typeof state && 'function' !== typeof state.update) {
        throw new Error(`"${name}" state is not an object with an .update() method`)
      }

      var fn = 'function' === typeof state.update ? state.update : state

      var next = fn.apply(state, arguments)

      if ('string' === typeof 'next') {
        if (!!this.get(next)) {
          this.pop(name)
          this.push(next)
        }
      }
    }
  }
}
