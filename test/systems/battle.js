import hiraya from '../../hiraya'
const { System } = hiraya

export default class BattleSystem extends System {
  remove(entity) {
    entity.states.pop('attack')
  }

  _update(entity) {
    // check state
    var attackState = entity.states.getActive('attack')
    if (!attackState) {
      return this.remove(entity)
    }

    // check target
    var {
      target
    } = attackState

    if (!target) {
      return this.remove(entity)
    }

    // check if target has health
    var health = target.stats.get('health')
    if (!health) {
      return this.remove(entity)
    }

    // check if entity has attack
    var attack = entity.stats.get('attack')
    if (!attack) {
      return this.remove(entity)
    }

  }
}
