import hiraya from '../../hiraya'
const { Entity } = hiraya


/**
 * description of this class
 * @class Character
 * @extends Entity
 * @constructor
 */
export default class Character extends Entity {
  init() {
    super.init()
    this.hp = this.stats.add('health')
    this.atk = this.stats.add('attack')
  }
}
