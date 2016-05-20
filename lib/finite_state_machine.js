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
     * @type {Function}
     */
    this.active = null
  }

  get(name) {
    return this.states[name]
  }

  /**
   * description of this method
   * @method register
   * @param {string} name name of the state
   * @param {Function|Object} logic logic of the state
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
  }

  /**
   * Adds a registered state to the stack
   * @method push
   * @param {string} name name of the registered state to be stacked
   */
  push(name) {
    // if (!name) { throw new Error('name is needed to register') }
    var state = this.states[name]
    if (!state) {
      throw new Error(`${name} is not a valid registered state`)
    }
    if (this.stack[0] === name) {
      return
    }
    this.stack.unshift(name)
    this.active = state
  }

  /**
   * Removes the current active state
   * @method pop
   */
  pop() {
    this.stack.shift()
    var fn = this.states[this.stack[0]]
    this.active = fn
  }

  /**
   * update
   * @method update
   */
  update() {
    var update;
    if ('function' === typeof this.active.update) {
      update = this.active.update
    } else if ('function' === typeof this.active) {
      update = this.active
    } else {
      throw new Error(`state is not a function nor an object with an .update() method`)
    }
    var newState = update.apply(this, arguments)
    if ('string' === typeof newState) {
      var state = this.states[newState]
      if ('function' === typeof state) {
        this.active = this.states[newState]
      }
    }
  }
}
