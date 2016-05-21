/**
 * A state for the state machine
 * @class State
 * @constructor
 * @param {Object} options properties to override
 */
export default class State {
  constructor(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key]
      }
    }
  }

  /**
   * called on every game tick
   * @event update
   * @param {Number} dt time passed since last update in seconds
   */
  update(dt) { }

  /**
   * called when entering this state
   * @event enter
   */
  enter() { }

  /**
   * called when exiting this state
   * @event exit
   */
  exit() { }
}
