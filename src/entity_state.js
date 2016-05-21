/**
 * description of this class
 * @class EntityState
 * @constructor
 * @param {object} options
 */
module.exports = class EntityState {
  /**
   * description of this method
   * @method update
   * @param {Number} delta time elapsed since last update
   * @param {Entity} entity entity context
   * @param {Input} input input context
   * @return {EntityState} optional next state
   */
  update(/** dt, entity, dt **/) {
  }

  /**
   * Fired when exiting
   * @event exit
   */
  exit() {
  }

  /**
   * Fired when entering
   * @event enter
   */
  enter() {
  }
}
