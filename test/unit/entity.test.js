import {
  assert
} from 'chai'
import FiniteStateMachine from '../../src/finite_state_machine'
import Entity from '../../src/entity'

describe('Entity', function() {
  var entity = new Entity()

  describe('#states', function() {
    it('should be an instance of FiniteStateMachine', function() {
      assert.instanceOf(
        entity.states,
        FiniteStateMachine,
        'entity.states is an instance of FiniteStateMachine'
      )
    })
  })

  describe('#update(elapsed)', function() {
    it('is a function', function() {
      assert.isFunction(entity.update)
    })
  })
})
