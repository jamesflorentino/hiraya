import MutableClass from './mutable_class'
/**
 * A state for the state machine
 * @class State
 */
class State extends MutableClass {
  /**
   * called on every game tick
   * @method update
   * @return {String}
   */
  update(/**dt**/) { }

  /**
   * called when entering this state
   * @event enter
   * @param {Object} context data to be passed to the enter state
   */
  enter() { }

  /**
   * called when exiting this state
   * @event exit
   */
  exit() { }
}

State.create = (options) => new State(options)

export default State
