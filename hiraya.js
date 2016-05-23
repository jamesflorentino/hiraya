import Entity from './src/entity'
import EntityManager from './src/entity_manager'
import State from './src/state'
import Stat from './src/stat'
import StateDictionary from './src/state_dictionary'
import Point from './src/point'
import MutableClass from './src/mutable_class'
import CommandManager from './src/command_manager'
import System from './src/system'
import World from './src/world'
import extend from './src/util/extend'
import isObject from './src/util/is_object'
import eachKey from './src/util/each_key'

/**
 * @module hiraya
 */
export default {
  CommandManager: CommandManager,
  Entity: Entity,
  MutableClass: MutableClass,
  Point: Point,
  State: State,
  Stat: Stat,
  System: System,
  World: World,
  EntityManager: EntityManager,
  StateDictionary: StateDictionary,

  entity: (options) => new Entity(options),
  state: (options) => new State(options),
  stat: (max, min) => new Stat(max, min),
  world: (options) => new World(options),
  point: (x, y) => new Point(x, y),
  system: (options) => new System(options),

  commandManager: () => new CommandManager(),

  util: {
    extend: extend,
    isObject: isObject,
    eachKey: eachKey
  }

}
