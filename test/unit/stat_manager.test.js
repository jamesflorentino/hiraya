import { assert } from 'chai'
import StatManager from '../../src/stat_manager'
import Stat from '../../src/stat'

describe('StatManager', function() {
  describe('#add(name)', function() {
    var stats = new StatManager()
    it('is a function', function() {
      var stats = new StatManager()
      assert.isFunction(stats.add)
    })

    it('creates a stat instance by name', function() {
      stats.add('health')
      assert.instanceOf(stats.get('health'), Stat)
    })
  })

  describe('#get(name)', function() {
    var stats = new StatManager()
    it('is a function', function() {
      assert.isFunction(stats.get)
    })

    it('returns the right instance', function() {
      stats.add('health', 100)
      assert.equal(stats.get('health').max, 100)
    })
  })
})
