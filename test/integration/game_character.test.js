import {
  assert
} from 'chai'
import Entity from '../../src/entity'
import Point from '../../src/point'


describe('game character test', function() {
  describe('standing to jumping', function() {
    it('updates the correct values', function() {
      var entity = new Entity()
      var velocity = new Point()
      // add the character states
      entity.states.register('standing', (dt) => velocity.x = 0)
      entity.states.register('jumping', (dt) => velocity.y = -1)

      // load the standing states
      entity.states.push('standing')
      entity.states.push('jumping')

      // increase the time by 1 second
      entity.states.update(1, entity)
      assert.equal(velocity.x, 0)
      assert.equal(velocity.y, -1)
    })
  })

  describe('standing to moving to jumping', function() {
    it('updates the correct values', function() {
      var entity = new Entity()
      var velocity = new Point()
      // add the character states
      entity.states.register('standing', (dt) => velocity.x = 0)
      entity.states.register('moving', (dt) => velocity.x = 1)
      entity.states.register('jumping', (dt) => velocity.y = -1)

      // load the standing states
      entity.states.push('standing')
      entity.states.update(1, entity)

      entity.states.push('moving')
      entity.states.update(1, entity)

      entity.states.push('jumping')
      entity.states.update(1, entity)

      assert.equal(entity.states.stack.length, 3)
      assert.equal(velocity.y, -1)
      assert.equal(velocity.x, 1)
    })
    
  })
})
