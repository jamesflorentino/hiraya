import MutableClass from './mutable_class'
import EntityManager from './entity_manager'
import SystemManager from './system_manager'
import Entity from './entity'
import StateDictionary from './state_dictionary'
import isObject from './util/is_object'
import isArray from './util/is_array'
import eachKey from './util/each_key'

/**
 * A basic game world where everything is processed
 * @class World
 */
export default class World extends MutableClass {
  init() {
    this.entities = new EntityManager()
    this.systems = new SystemManager()
    this.states = new StateDictionary()
  }

  createEntity(options) {
    var entity = new Entity()
    if (isObject(options)) {
      eachKey(options, (key, value) => {
        if (key === 'name') {
          entity.name = value
        } else if (key === 'states' && isArray(value)) {
          value.forEach((name) => {
            entity.states.add(name, this.states.create(name))
          })
        } else if (key === 'stats' && isObject(value)) {
          eachKey(value, entity.stats.add, entity.stats)
        }
      })
    }
    this.entities.add(entity)
    return entity
  }

  /**
   * Updates the world state
   * @method update
   * @param  {Number} dt time passed since last update
   */
  update(dt) {
    var fps = 1 / 30
    var list = this.entities.list;

    // semi-fixed time-step:
    // http://gafferongames.com/game-physics/fix-your-timestep/
    while (dt > 0) {
      var frameTime = dt > fps ? fps : dt
      for (var i = 0, len = list.length; i < len; i++) {
        var entity = list[i]
        entity.update(frameTime)
        this.applySystems(entity, frameTime)
      }
      dt = dt - fps
    }
  }

  applySystems(entity, dt) {
    var systems = this.systems.list
    for (var i = 0, len = systems.length; i < len; i++) {
      var system = systems[i]
      system.update(entity, dt)
    }
  }


}
