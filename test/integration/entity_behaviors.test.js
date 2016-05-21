import {
  assert
} from 'chai'
import Entity from '../../src/entity'

describe('Entity Behaviors', function() {
  describe('Entity#update', function() {
    it('updates the properties of the entity', function() {
      var entity = new Entity()
      entity.states.register('stand', () => entity.velocity.set(0))
      entity.states.register('walk', () => entity.velocity.set(1, 0))
      entity.states.push('walk')
      entity.update(1000) // 1 second
      assert.equal(entity.position.x, 1)
    })

    it('returns to previous state', function() {
      var entity = new Entity()
      var time = 0
      entity.states.register('stand', () => entity.velocity.x = 0)
      entity.states.register('walk-then-stand', (dt) => {
        console.log('dt', dt);
        time += dt
        if (time >= 2) {
          console.log('reache his limti');
          return true
        }
        entity.velocity.x = 1
      })
      entity.states.push('stand')
      entity.states.push('walk-then-stand')
      entity.update(2000)
      entity.update(1000)
      assert.equal(entity.velocity.x, 0)
    })
  })
})
