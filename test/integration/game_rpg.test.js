import {
  assert
} from 'chai'
import hiraya from '../../hiraya'

describe('an rpg world', () => {

  var world = hiraya.world()

  class DeathState extends hiraya.State {

    enter() {
      this.status = 'dead'
    }
  }

  class BattleState extends hiraya.State {
    init() {
      this.cooldown = new hiraya.Stat(1)
    }

    enter(target) {
      this.next = 'death'
      this.cooldown.empty()
      this.target = target
    }

    update(entity) {
      var healthStat = this.target.stats.get('health')
      var attackStat = entity.stats.get('attack')
      healthStat.subtract(attackStat)
      if (healthStat.isEmpty()) {
        return this.next
      }
    }
  }

  world.states.register('death', DeathState)
  world.states.register('battle', BattleState)

  describe('has a character with stats and states', () => {
    world.hero = world.createEntity({
      name: 'Hero',
      stats: { health: 100, attack: 10 },
      states: [ 'death', 'battle' ]
    })

    it('who exists in the game world', () => {
      assert.equal(
        world.entities.get(0),
        world.hero,
        'hero must exist in the world'
      )
    })

    it('who has a battle state', () => {
      assert.instanceOf(
        world.hero.states.get('battle'),
        BattleState,
        'battle state is place'
      )
    })

    it('who has a health stat', () => {
      assert.isNumber(
        world.hero.stats.get('health').value,
        'health stat is in place'
      )
    })

    it('who has a attack stat', () => {
      assert.isNumber(
        world.hero.stats.get('attack').value,
        'attack stat is in place'
      )
    })


  })

  describe('has a monster', () => {

    world.monster = world.createEntity({
      name: 'Hero',
      stats: { health: 100, attack: 10 },
      states: [ 'death', 'battle' ]
    })

    it('who exists in the game world', () => {
      assert.equal(
        world.entities.get(1),
        world.monster,
        'monster must exist in the world'
      )
    })
  })

  describe('has a battle system', () => {

    it('that performs basic attack/health computation', () => {
      world.hero.states.push('battle', world.monster)
      world.update(1)
      var monsterHealth = world.monster.stats.get('health')
      var heroAttack = world.hero.stats.get('attack')
      assert.equal(
        monsterHealth.value,
        monsterHealth.max - heroAttack.value,
        'hero diminishes his attack value from the monster hp'
      )
    })

    it.skip('that switches the entity state appropriately', () => {
      world.update(1000)
      assert.equal(world.monster.states.active, 'death')
    })
  })
})
