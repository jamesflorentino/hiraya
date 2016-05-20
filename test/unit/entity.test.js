import {
  assert
} from 'chai'
import FiniteStateMachine from '../../src/finite_state_machine'
import Entity from '../../src/entity'
import Point from '../../src/point'


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

  describe('#position', function() {
    it('is a point', function() {
      assert.instanceOf(
        entity.position,
        Point,
        'entity.position is an instance of Point'
      )
    })
  })

  describe('#velocity', function() {
    it('is a point', function() {
      assert.instanceOf(
        entity.velocity,
        Point,
        'entity.velocity is an instance of Point'
      )
    })
  })

  describe('#update(elapsed)', function() {
    it('is a function', function() {
      assert.isFunction(entity.update)
    })
  })
})
