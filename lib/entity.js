import FiniteStateMachine from './finite_state_machine'
import Point from './point'

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
    this.states.update(this, elapsed)
    this.position.lerp(this.velocity, elapsed/1000)
  }
}
