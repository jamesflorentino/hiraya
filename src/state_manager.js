import State from './state'
/**
 * description of this class
 * @class StateManager
 * @constructor
 */
export default class StateManager {

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
   * @chainable
   */
  add(name, logic) {
    var state
    if (!logic) {
      throw new Error(`${name} cannot be null or undefined`)
    } else if (logic instanceof State) {
      state = logic
    } else if ('object' === typeof logic) {
      state = new State(logic)
    } else if ('function' === typeof logic) {
      state = new State({ update: logic })
    } else {
      throw new Error(`${name} is an invalid state`)
    }
    state.name = name

    this.states[name] = state
    return this
  }

  /**
   * Adds a state to the stack
   * @method push
   * @param {String|State} name name of a registered state or a new property
   * @param {Object} context
   */
  push(name) {
    var state;
    if ('string' === typeof name) {
      state = this.states[name]
      if (!(state instanceof State)) {
        throw new Error(`${name} is not a valid registered state`)
      }
    } else if (name instanceof State) {
      if ('string' !== typeof name.name) {
        throw new Error(`state must have a name`)
      }
    } else if ('object' === typeof name) {
      state = new State(name)
    }

    if (!state.name) {
      throw new Error(`undefined state ${name} ${JSON.stringify(state)}`)
    }

    if (this.active === state.name) {
      state = this.getActive(this.active)
    } else {
      this.stack.push(state.name)
      this.active = state.name
    }

    var params = Array.prototype.slice.call(arguments, 1, arguments.length)
    state.onEnter.apply(state, params)
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
          state.onExit()
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

      fn.apply(state, arguments)

      if (state.isExiting) {
        this.pop(name)
        if (state.next) {
          this.push(state.next)
        }
      }
    }
  }
}
