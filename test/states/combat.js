import hiraya from '../../hiraya'
import DeathState from './death'

export default class CombatState extends hiraya.State {
  onEnter(target) {
    this.cooldown = hiraya.stat(1)
    this.cooldown.empty()
    this.target = target
  }

  update(entity, dt) {
    this.cooldown.increase(dt)
      if (!this.cooldown.isMaxed()) {
        return
      }
    var target = this.target
      if (!target.states.getActive(this.name)) {
        target.states.push(this.name, entity)
      }
    var health = target.stats.get('health')
      health.reduce(entity.stats.get('attack'))
      if (health.isEmpty()) {
        target.states.push(new DeathState())
        this.exit()
      }
  }
}
