import State from './state'
import extend from './util/extend'

/**
 * Used for storing {{#crossLink "State"}}{{/crossLink}} classes and subclasses
 *
 * ```
 * // you can pass an object that implements the `State` methods.
 * import hiraya from 'hiraya'
 *
 * var states = new hiraya.StateDictionary()
 * states.register('jump', {
 * 	update(entity) {
 * 		entity.status = 'jumping'
 * 	}
 * })
 *
 * // alternatively, you can also pass a subclass of state
 * import hiraya from 'hiraya'
 *
 * class WalkingState extends hiraya.State {
 * 	update(entity, deltaTime) {
 * 		entity.position.lerp(entity.velocity, deltaTime)
 * 	}
 * }
 * var states = new hiraya.StateDictionary()
 * states.register('walk', WalkingState)
 * ```
 * @class StateDictionary
 */
export default class StateDictionary {
  constructor() {
    /**
     * @property _ref
     * @type {Object}
     * @private
     */
    this._ref = {}
  }

  /**
   * Registers a state into the dictionary
   * @method register
   * @param {String} name name of the state to register
   * @param {State} IState an object or state subclass
   */
  register(name, StateClass) {
    // if the state argument is an object, we extend it as a subclass of state
    // if (typeof state === 'object') {
    //   state = extend(State, state)
    //     // if the state argument is a function and can be instantiated,
    // } else if (typeof state === 'function') {
    //   // we then check if it's a subclass of state
    //   var isSubclassOfState = state.prototype instanceof State
    //     // if true, then keep as is. If not, extend it
    //   state = isSubclassOfState ? state : extend(State, state.prototype)
    // }
    var isSubclassOfState = StateClass.prototype instanceof State
    if (!isSubclassOfState) {
      throw new Error(`${name} should be a subclass of State`)
    }
    this._ref[name] = StateClass
  }

  /**
   * @param create
   * @param  {String} name must be a valid registered name
   * @return {State} a class/subclasss of {{#crossLink "State"}}{{/crossLink}}
   */
  create(name) {
    var StateClass = this._ref[name]
    if (!StateClass) {
      throw new Error(`${name} is not a registered state`)
    }
    return new StateClass()
  }
}
