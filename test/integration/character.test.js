import { assert } from 'chai'
import hiraya from '../../hiraya'

describe('A character', () => {
  const character = hiraya.character.base()

  it('has hp', () => {
    assert.isNumber(character.hp.value)
  })

  it('has atk', () => {
    assert.isNumber(character.atk.value)
  })

})
