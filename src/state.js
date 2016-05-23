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
   * @method enter
   * @param {Object} context data to be passed to the enter state
   */
  enter() {
    this.isExiting = false
  }

  /**
   * @method exit
   * @params {String} next next state to transition to
   */
  exit(next) {
    this.next = next
    this.isExiting = true
  }

  /**
   * @event onEnter
   */
  onEnter() { }

  /**
   * @event onExit
   */
  onExit() { }
}

State.create = (options) => new State(options)

export default State
