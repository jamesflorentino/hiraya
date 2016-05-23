import { assert } from 'chai'
import FiniteStateMachine from '../../src/finite_state_machine'
import Point from '../../src/point'

describe('FiniteStateMachine', function() {
  var fsm = new FiniteStateMachine()

  describe('#register(name, function)', function() {
    it('is a function', function() {
      assert.isFunction(fsm.register)
    })

    it('adds a callback function', function() {
      fsm.register('stand', () => 'foo')
      assert.isFunction(fsm.states.stand)
    })
  })

  describe('#push(name)', function() {
    it('is a function', function() {
      assert.isFunction(fsm.push)
    })

    it('sets the new state as the active state', function() {
      var standing = () => {}
      fsm.register('standing', standing)
      fsm.push('standing')
      assert.equal('standing', fsm.active)
    })

    it('sets the recently stacked state as the active state', function() {
      var walking = () => {}
      fsm.register('walking', walking)
      fsm.push('walking')
      assert.equal('walking', fsm.active)
    })

    it('throws an error if state name is not registered', function() {
      var fn = () => fsm.push('unregistered-state')
      assert.throws(fn)
    })

    it('does not restack an recently added state', function() {
      var fsm = new FiniteStateMachine()
      fsm.register('stand', () => {})
      fsm.register('shoot', () => {})
      fsm.push('stand')
      fsm.push('shoot')
      fsm.push('shoot')
      assert.lengthOf(fsm.stack, 2)
    })

    it('accepts an object with an .update() method', function() {
      var fsm = new FiniteStateMachine()
      fsm.register('stand', {
        update() {}
      })
      fsm.push('stand')
      assert.lengthOf(fsm.stack, 1)
    })

    it('throws an error when a state is invalid', function() {
      var fsm = new FiniteStateMachine()
      var fn = () => fsm.register('stand', null)
      assert.throws(fn)
    })
  })

  describe('#pop()', function() {
    it('is a function', function() {
      assert.isFunction(fsm.pop)
    })

    it('removes the last state added', function() {
      var lastState = fsm.active
      fsm.pop()
      assert.notEqual(lastState, fsm.active)
    })
  })


  describe('#update(entity, input)', function() {
    it('should update properties based on the state behavior', function() {
      var point = new Point()
      var fsm = new FiniteStateMachine()
      fsm.register('walk', function() {
        point.x = 1
      })

      fsm.push('walk')
      fsm.update()
      assert.equal(point.x, 1)
    })
  })

})
