import extend from './util/extend'
export default class CommandManager {
  constructor(options) {
    extend(this, options)
    this.commands = {}
  }

  get(name) {
    return this.commands[name]
  }

  add(name, command) {
    this.commands[name] = command
  }

  update() {
  }
}
