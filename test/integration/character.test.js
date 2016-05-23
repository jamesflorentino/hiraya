import {
  assert
} from 'chai'
import Character from  '../entities/character'

describe('A character', () => {

  const character = new Character()

  it('has hp', () => {
    assert.isNumber(character.hp.value)
  })

  it('has atk', () => {
    assert.isNumber(character.atk.value)
  })

})
