import {
  assert
} from 'chai'
import hiraya from '../../hiraya'

describe('RPG Game', () => {

  describe('Basic Combat', () => {
    var world = hiraya.world()

    it('has a combat system', () => {

      world.states.register('death', {
        update(entity) {
          if (entity.states.getActive('combat')) {
            entity.states.pop('combat')
          }
        }
      })

      world.states.register('combat', {

        name: 'combat',

        onEnter(target) {
          this.cooldown = hiraya.stat(1)
          this.cooldown.empty()
          this.target = target
        },

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
            target.states.push('death')
            this.exit()
          }

        }
      })

      var hero = world.createEntity({
        name: 'hero',
        stats: {
          health: 100,
          attack: 10
        },
        states: ['combat', 'death']
      })

      var monster = world.createEntity({
        name: 'monster',
        stats: {
          health: 100,
          attack: 10
        },
        states: ['combat', 'death']
      })

      hero.states.push('combat', monster)

      assert.instanceOf(hero.states.getActive('combat'), hiraya.State)

      world.update(1)

      assert.instanceOf(hero.states.getActive('combat'), hiraya.State)
      assert.instanceOf(monster.states.getActive('combat'), hiraya.State)

      assert.equal(
        monster.stats.get('health').value,
        monster.stats.get('health').max - hero.stats.get('attack').value,
        'hero has attacked monster'
      )

      world.update(2)

      assert.equal(monster.states.active, 'death')

    })
  })
})
