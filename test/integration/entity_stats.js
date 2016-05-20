import {
  assert
} from 'chai'
import Entity from '../../src/entity'


describe('Entity Stats', function() {
  var entity = new Entity()
  describe('health', function() {
    entity.stats.add('health', 100)
    it('should have value', function() {
      assert.equal(entity.stats.get('health').value, 100)
    })
  })

  describe('attack', function() {
    entity.stats.add('attack', 10)
    it('should have value', function() {
      assert.equal(entity.stats.get('attack').value, 10)
    })

    it('can be used to reduce health', function() {
      var health = entity.get('health')
      var attack = entity.get('attack')
      health.subtract(attack)
      assert.equal(health.value, 90)
    })
  })
})
