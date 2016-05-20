import { assert } from 'chai'
import Stat from '../../src/stat'

describe('Stat', function() {
  describe('#constructor(max, min)', function() {
    it('stores the max value', function() {
      var stat = new Stat(100)
      assert.equal(stat.max, 100)
    })

    it('stores the min value', function() {
      var stat = new Stat(100, 10)
      assert.equal(stat.min, 10)
    })

    it('stores the current value', function() {
      var stat = new Stat(100)
      assert.equal(stat.value, 100)
    })
  })

  describe('#substract(stat)', function() {
    var health = new Stat(100)
    var attack = new Stat(10)
    it('shows the correct new value', function() {
      health.subtract(attack)
      assert.equal(health.value, 90)
    })

    it('should not go below zero', function() {
      var superpower = new Stat(1000)
      health.subtract(superpower)
      assert.equal(health.value, 0)
    })
  })

  describe('#add(stat)', function() {
    var health = new Stat(100)
    var attack = new Stat(50)
    var heal = new Stat(10)

    it('adds the correct value', function() {
      health.subtract(attack)
      health.add(heal)
      assert.equal(health.value, 60)
    })

    it('does not go beyond the max value', function() {
      var health = new Stat(100)
      var megaheal = new Stat(1000)
      health.add(megaheal)
      assert.equal(health.value, 100)
    })
  })
})
