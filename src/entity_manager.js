import Entity from './entity'
import findBy from './util/find_by'

export default class EntityManager {
  constructor() {
    this.list = []
    this.length = 0
  }

  /**
   * @method get
   * @param {Number} idx
   */
  get(idx) {
    return this.list[idx]
  }

  findBy(key, value) {
    return findBy(this.list, key, value)
  }

  /**
   * @method add
   * @param {Entity} entity an object or entity describing the entity
   */
  add(entity) {
    entity = this.create(entity)
    this.list.push(entity)
    this.length++
    return entity
  }

  has(entity) {
    return this.list.indexOf(entity) > -1
  }

  create(data) {
    if ('object' !== typeof data) {
      throw new Error(`must be an object or instance of an entity`)
    }

    return data instanceof Entity ? data : new Entity(data)
  }

  /**
   * @method remove
   * @param {Entity} entity entity to be removed
   */
  remove(entity) {
    var idx = this.list.indexOf(entity)
    if (idx === -1) {
      return
    }
    this.list.splice(idx, 1)
    this.length--
  }
}
