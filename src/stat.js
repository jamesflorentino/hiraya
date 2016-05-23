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
    this.max = 'number' === typeof max ? max : 0

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
   * @method increase
   * @param {Number} amount
   */
  increase(amount) {
    this.value = Math.min(this.max, this.value + amount)
  }

  /**
   * @method isMaxed
   * @return {Boolean}
   */
  isMaxed() {
    return this.value === this.max
  }

  /**
   * @method isEmpty
   * @return {Boolean}
   */
  isEmpty() {
    return this.value === this.min
  }

  /**
   * sets the current value to max
   * @method reset
   * @chainable
   */
  reset() {
    this.value = this.max
    return this
  }

  empty() {
    this.value = this.min
    return this
  }

  /**
   * sets the max value
   * @method setMax
   * @param {Number} value value to be set to max
   * @chainable
   */
  setMax(value) {
    this.max = value
    return this
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
    this.value -= stat.value
    if (this.value < this.min) {
      this.value = this.min
    }
  }

  reduce() {
    this.subtract.apply(this, arguments)
  }
}
