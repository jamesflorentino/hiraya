import Entity from './src/entity'
import State from './src/state'
import Stat from './src/stat'
import Directions from './src/directions'
/**
 * @module hiraya
 */
export default {
  Entity: Entity,
  State: State,
  Stat: Stat,

  entity: (options) => new Entity(options),
  state: (options) => new State(options),
  stat: (max, min) => new Stat(max, min)

}
