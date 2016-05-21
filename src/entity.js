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

    this.stats = new StatManager()

    /**
     * Current coordinates
     * @property position
     * @type {Point}
     */
    this.position = new Point()

    /**
     * Current velocity
     * @property velocity
     * @type {Point}
     */
    this.velocity = new Point()


  }

  /**
   * Updates the entity states and other properties
   * @method update
   * @param {Number} delta delta time passed since last update in milliseconds
   */
  update(elapsed) {
    var dt = elapsed / 1000
    this.states.update(dt)
    this.position.lerp(this.velocity, dt)
  }
}
