import {
  assert
} from 'chai'
import Entity from '../../src/entity'
import Point from '../../src/point'

describe('Entity Behaviors', () => {
  describe('Entity#update', function() {
    it('updates the properties of the entity', () => {
      var entity = new Entity()
      var velocity = new Point()
      entity.states.add('stand', () => velocity.set(0))
      entity.states.add('walk', () => velocity.set(1, 0))
      entity.states.push('walk')
      entity.update(1) // 1 second
      assert.equal(velocity.x, 1)
    })

    it('returns to previous state', () => {
      var entity = new Entity()
      var velocity = new Point()
      var time = 0
      entity.states.add('stand', () => velocity.x = 0)
      entity.states.add('walk-then-stand', (entity, dt) => {
        time += dt
        if (time >= 2) {
          return true
        }
        velocity.x = 1
      })
      entity.states.push('stand')
      entity.states.push('walk-then-stand')
      entity.update(2)
      entity.update(1)
      assert.equal(velocity.x, 0)
    })
  })
})
