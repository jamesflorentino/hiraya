import {
  assert
} from 'chai'
import Point from '../../lib/point'


describe('Point', function() {

  describe('#x', function() {
    it('should be a number', function() {
      var point = new Point()
      assert.isNumber(point.x)
    })
  })

  describe('#y', function() {
    it('should be a number', function() {
      var point = new Point()
      assert.isNumber(point.y)
    })
  })

  describe('#set', function() {
    it('should update values', function() {
      var point = new Point()
      point.set(1)
      assert.equal(point.x, 1)
      assert.equal(point.y, 1)
      point.set(1, 0)
      assert.equal(point.x, 1)
      assert.equal(point.y, 0)
    })
  })
})
