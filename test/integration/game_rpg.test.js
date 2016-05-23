import {
  assert
} from 'chai'
import hiraya from '../../hiraya'

describe('an rpg world', () => {

  var world = hiraya.world()

  class BattleState extends hiraya.State {
    init() {
      this.cooldown = new hiraya.Stat(1)
    }

    onEnter(target) {
      console.log('entering...');
      this.cooldown.empty()
      this.target = target
    }

    onExit() {
      this.target = null
    }

    update(entity, dt) {
      this.cooldown.increase(dt)
      if (!this.cooldown.isMaxed()) {
        return
      }
      var healthStat = this.target.stats.get('health')
      var attackStat = entity.stats.get('attack')
      healthStat.subtract(attackStat)
      if (healthStat.isEmpty()) {
        this.target.states.push('death')
        this.exit()
      }
    }
  }

  describe('can register states', () => {
    world.states.register('death', {
      onEnter() {
        this.say = 'I am dead'
      }
    })
    world.states.register('battle', BattleState)
  })

  describe('has a character with stats and states', () => {
    world.hero = world.createEntity({
      name: 'Hero',
      stats: {
        health: 100,
        attack: 10
      },
      states: ['death', 'battle']
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
      stats: {
        health: 100,
        attack: 10
      },
      states: ['death', 'battle']
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

    it('that switches the entity state appropriately', () => {
      world.update(1)
      assert.equal(world.hero.states.stack.length, 0)
      assert.equal(world.monster.states.active, 'death')
      assert.equal(world.monster.states.getActive('death').say, 'I am dead')
    })

    it('that does not stack similar states', () => {
      var monster = world.createEntity({
        name: 'Big Monster',
        stats: {
          health: 1000,
          attack: 10
        },
        states: ['death', 'battle']
      })
      world.hero.states.push('battle', monster)
      assert.equal(world.hero.states.stack.length, 1)
    })

    it('that re-assigns parameters to existing stacks', () => {
      var hero = world.hero
      var bat = world.createEntity({
        name: 'Bat',
        stats: {
          health: 1000,
          attack: 10
        },
        states: ['death', 'battle']
      })

      hero.states.push('battle', bat)

      assert.equal(hero.states.get('battle').target, bat)
    })
  })
})
