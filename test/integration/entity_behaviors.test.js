import {
  assert
} from 'chai'
import Entity from '../../src/entity'
import Point from '../../src/point'

describe('Entity Behaviors', function() {
  describe('Entity#update', function() {
    it('updates the properties of the entity', function() {
      var entity = new Entity()
      var velocity = new Point()
      entity.states.register('stand', () => velocity.set(0))
      entity.states.register('walk', () => velocity.set(1, 0))
      entity.states.push('walk')
      entity.update(1000) // 1 second
      assert.equal(velocity.x, 1)
    })

    it('returns to previous state', function() {
      var entity = new Entity()
      var velocity = new Point()
      var time = 0
      entity.states.register('stand', () => velocity.x = 0)
      entity.states.register('walk-then-stand', (dt) => {
        time += dt
        if (time >= 2) {
          return true
        }
        velocity.x = 1
      })
      entity.states.push('stand')
      entity.states.push('walk-then-stand')
      entity.update(2000)
      entity.update(1000)
      assert.equal(velocity.x, 0)
    })
  })
})
