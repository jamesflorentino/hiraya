import {
  assert
} from 'chai'
import Entity from '../../src/entity'


describe('game character test', function() {
  describe('standing to jumping', function() {
    it('updates the correct values', function() {
      var entity = new Entity()
      // add the character states
      entity.states.register('standing', (dt) => entity.velocity.x = 0)
      entity.states.register('jumping', (dt) => entity.velocity.y = -1)

      // load the standing states
      entity.states.push('standing')
      entity.states.push('jumping')

      // increase the time by 1 second
      entity.states.update(1, entity)
      assert.equal(entity.velocity.x, 0)
      assert.equal(entity.velocity.y, -1)
    })
  })

  describe('standing to moving to jumping', function() {
    it('updates the correct values', function() {
      var entity = new Entity()
      // add the character states
      entity.states.register('standing', (dt) => entity.velocity.x = 0)
      entity.states.register('moving', (dt) => entity.velocity.x = 1)
      entity.states.register('jumping', (dt) => entity.velocity.y = -1)

      // load the standing states
      entity.states.push('standing')
      entity.states.update(1, entity)
      console.log(entity.velocity);

      entity.states.push('moving')
      entity.states.update(1, entity)
      console.log(entity.velocity);

      entity.states.push('jumping')
      entity.states.update(1, entity)
      console.log(entity.velocity);

      assert.equal(entity.states.stack.length, 3)
      assert.equal(entity.velocity.y, -1)
      assert.equal(entity.velocity.x, 1)
    })
    
  })
})
