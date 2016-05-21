import Entity from './entity'

export default class Character extends Entity {
  constructor() {
    super()

    this.hp = this.stats.add('health')
    this.atk = this.stats.add('attack')
  }
}
