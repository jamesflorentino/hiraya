import Entity from './src/entity'
import State from './src/state'
import Stat from './src/stat'
import Character from './src/character'

/**
 * @module hiraya
 */
export default {
  Entity: Entity,
  State: State,
  Stat: Stat,
  Character: Character,

  entity: (options) => new Entity(options),
  state: (options) => new State(options),
  stat: (max, min) => new Stat(max, min),
  character: {
    base: (options) => new Character(options)
  }

}
