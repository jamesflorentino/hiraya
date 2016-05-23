import {
  assert
} from 'chai'

import Character from '../entities/character'

describe('a battle system', () => {

  describe('lets a character attack another character', () => {
    const system = {
      update(attacker, attackee) {
        attackee.hp.subtract(attacker.atk)
      }
    }

    var hero = new Character()
    var enemy = new Character()

    hero.stats.get('attack').setMax(10).reset()
    enemy.stats.get('health').setMax(100).reset()

    system.update(hero, enemy)

    assert.equal(
      enemy.stats.get('health').value,
      enemy.stats.get('health').max - hero.stats.get('attack').value,
      'health is reduced with attacker\'s `attack` stat value'
    )

  })
})
