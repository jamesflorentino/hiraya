import Stat from './stat'

/**
 * Useful for things like RPG stats (health, attack, etc.)
 * @class StatManager
 * @constructor
 */
export default class StatManager {
  constructor() {
    /**
     * Dictionary of stat names
     * @property stats
     * @type {Object}
     */
    this.stats = {}
  }

  /**
   * Returns a stat attribute
   * @method get
   * @param {String} name
   * @return Stat
   */
  get(name) {
    return this.stats[name]
  }


  /**
   * Generates a new stat by name
   * @method add
   * @param {String} name
   * @param {Number} max
   */
  add(name, max) {
    this.stats[name] = new Stat(max)
  }
}
