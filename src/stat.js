/**
 * Used for storing min, max values
 * @class Stat
 * @constructor
 * @param {Number} max
 * @param {Number} [min]
 */
export default class Stat {
  constructor(max, min) {
    /**
     * @property max
     * @type {Number}
     */
    this.max = 'number' === typeof max  ? max : 0

    /**
     * @property min
     * @type {Number}
     */
    this.min = 'number' === typeof min ? min : 0

    /**
     * current value
     * @property value
     * @type {Number}
     */
    this.value = this.max
  }

  /**
   * @method add
   * @param {Stat} stat
   */
  add(stat) {
    this.value = Math.min(this.max, this.value + stat.value)
  }
  /**
   * @method subtract
   * @param {Stat} stat
   */
  subtract(stat) {
    this.value = Math.max(this.min, this.value - stat.value)
  }
}
