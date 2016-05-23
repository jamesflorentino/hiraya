import {
  assert
} from 'chai'
import hiraya from '../../hiraya'
const { eachKey, isObject } = hiraya.util

describe('a basic game world', () => {
  var world = hiraya.world()

  it('can store state classes for later instantions', () => {
    assert.isDefined(world.states)
    assert.instanceOf(world.states, hiraya.StateDictionary)
  })

  it('can register and store state classes', () => {
    class JumpState extends hiraya.State {
      enter() {
        this.time = 0
        this.speed = 1
      }
      update(entity, dt) {
        this.time += dt
        if (this.time < 1) {
          return
        }
        entity.y -= this.speed
      }
    }
    world.states.register('jump', JumpState)
  })

  it('can manage entities', () => {
    assert.isDefined(world.entities)
    assert.instanceOf(world.entities, hiraya.EntityManager)
  })

  it('can add entities', () => {
    world.hero = world.createEntity({
      name: 'Hero',
      states: ['jump']
    })
    assert.equal(world.entities.length, 1)
  })

  it('has entities with valid state instances', () => {
    assert.instanceOf(world.hero.states.get('jump'), hiraya.State)
  })

  it('updates the states of the entities on update', () => {
    var { hero } = world
    hero.states.push('jump')
    world.update(1)
    assert.equal(hero.states.getActive('jump').time, 1)
  })

})
