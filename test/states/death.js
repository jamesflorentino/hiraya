import hiraya from '../hiraya'

class DeathState extends hiraya.State {
  update(entity) {
    if (entity.states.getActive('combat')) {
      entity.states.pop('combat')
    }
  }
}
