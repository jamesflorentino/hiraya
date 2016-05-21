export default class State {
  constructor(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key]
      }
    }
  }
  update(dt) { }
  enter() { }
  exit() { }
}
