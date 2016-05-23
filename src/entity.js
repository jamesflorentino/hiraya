import FiniteStateMachine from './finite_state_machine'
import StatManager from './stat_manager'
import MutableClass from './mutable_class'

var ID = 0
// import isFunction from './util/is_function'

/**
 * description of this class
 * @class Entity
 * @extends MutableClass
 */
export default class Entity extends MutableClass {
  init() {
    /**
     * The state manager for this entity
     * @property states
     * @type {FiniteStateMachine}
     */
    this.states = new FiniteStateMachine()

    /**
     * For managing different attributes
     * @property stats
     * @type {StatManager}
     */
    this.stats = new StatManager()
    this.id = ID++
  }

  /**
   * Updates the entity states and other properties
   * @method update
   * @param {Number} delta delta time passed since last update in seconds
   */
  update(dt) {
    this.states.update(this, dt)
  }
}
