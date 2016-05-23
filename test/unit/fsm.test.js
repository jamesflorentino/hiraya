import { assert } from 'chai'
import StateManager from '../../src/state_manager'
import Point from '../../src/point'

describe('StateManager', function() {
  var stateManager = new StateManager()

  describe('#register(name, function)', function() {
    it('is a function', function() {
      assert.isFunction(stateManager.add)
    })

    it('adds a callback function', function() {
      stateManager.add('stand', () => 'foo')
      assert.isFunction(stateManager.states.stand)
    })
  })

  describe('#push(name)', function() {
    it('is a function', function() {
      assert.isFunction(stateManager.push)
    })

    it('sets the new state as the active state', function() {
      var standing = () => {}
      stateManager.add('standing', standing)
      stateManager.push('standing')
      assert.equal('standing', stateManager.active)
    })

    it('sets the recently stacked state as the active state', function() {
      var walking = () => {}
      stateManager.add('walking', walking)
      stateManager.push('walking')
      assert.equal('walking', stateManager.active)
    })

    it('throws an error if state name is not registered', function() {
      var fn = () => stateManager.push('unregistered-state')
      assert.throws(fn)
    })

    it('does not restack an recently added state', function() {
      var stateManager = new StateManager()
      stateManager.add('stand', () => {})
      stateManager.add('shoot', () => {})
      stateManager.push('stand')
      stateManager.push('shoot')
      stateManager.push('shoot')
      assert.lengthOf(stateManager.stack, 2)
    })

    it('accepts an object with an .update() method', function() {
      var stateManager = new StateManager()
      stateManager.add('stand', {
        update() {}
      })
      stateManager.push('stand')
      assert.lengthOf(stateManager.stack, 1)
    })

    it('throws an error when a state is invalid', function() {
      var stateManager = new StateManager()
      var fn = () => stateManager.add('stand', null)
      assert.throws(fn)
    })
  })

  describe('#pop()', function() {
    it('is a function', function() {
      assert.isFunction(stateManager.pop)
    })

    it('removes the last state added', function() {
      var lastState = stateManager.active
      stateManager.pop()
      assert.notEqual(lastState, stateManager.active)
    })
  })


  describe('#update(entity, input)', function() {
    it('should update properties based on the state behavior', function() {
      var point = new Point()
      var stateManager = new StateManager()
      stateManager.add('walk', function() {
        point.x = 1
      })

      stateManager.push('walk')
      stateManager.update()
      assert.equal(point.x, 1)
    })
  })

})
