import FiniteStateMachine from './finite_state_machine'
import Point from './point'
import StatManager from './stat_manager'

/**
 * description of this class
 * @class Entity
 */
export default class Entity {
  constructor() {
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
  }

  /**
   * Updates the entity states and other properties
   * @method update
   * @param {Number} delta delta time passed since last update in seconds
   */
  update(elapsed) {
    var dt = elapsed / 1000
    this.states.update(dt, this)
  }
}
