> WARNING: This framework is currently under development.

hiraya.js
=========

A microframework for game development in JavaScript that uses ES6.

Goals
=====

- to be easily used in any types of games from platformer, shooters, fighting, RPG, turn-based, and RPG.
- to be easily used in any existing javascript-based frameworks.
- to be testable
- to be fully 100% ES6 compliant.
- can run headless

Features
========

- [x] Entity API - The game objects/characters
- [x] Entity StateManager API - The state handling of an entity using an [FSM design pattern](https://en.wikipedia.org/wiki/Finite-state_machine)
- [x] Entity StatManager API - e.g. health, mana, stamina, armor, etc.
- [ ] Entity Skill API - e.g. melee, double slash, jump and shoot
- [ ] Entity Item API - Able to store and manage items
- [ ] Player API - Handling of player attributes and events
- [ ] Player Input API - Handling of inputs from theplayer
- [ ] Multiplayer API - used for multiplayer

Quick Example Usage
===================

```javascript
import hiraya from 'hiraya'

var world = hiraya.world()

class BattleState extends hiraya.State {
  enter() {
    this.target = options.target
  }
  update(entity) {
    this.target.stats.get('health').reduce(entity.stats.get('attack'))
  }
}

world.states.register('battle', BattleState)

var hero = world.createEntity({
  "stats": { "health": 100, "attack": 10 },
  "states": ["battle"]
})

var monster = world.createEntity({
  "stats": { "health": 50, "attack": 5 },
  "states": ["battle"]
})

// battle time!
hero.states.push('battle', monster)

world.update(1)
```

Code explained
==============

```javascript
import hiraya from 'hiraya'

// Initializing the game world
var world = hiraya.world()

// Hiraya uses a Finite State Machine (FSM) design pattern for handling the logic
// of the update loop. It is class-based in contrast to the
// Entity-Component-System which uses data-containers and system logics
// In FSM, the logic is in the State classes.
// Thus, it is required that your State classes should be a subclass of hiraya.State
class BattleState extends hiraya.State {
  init(settings) {
    this.cooldown = settings.cooldown || 1
  }

  enter() {
    this.target = options.target
  }

  exit() {
    // exiting...
  }

  update(entity) {
    this.target.stats.get('health').reduce(entity.stats.get('attack'))
  }
}

// The game world has a state class manager that manages the State subclasses
// for later use.
world.states.register('battle', BattleState)

// By default, an Entity has two properties.
// entity.states - the state machine that manages the registered states
// entity.stat - for managing attributes like health, and attack for example.
//
// The game world provides an API for you to pass in those configurations.
// Using this design pattern, it'll be easier to create multiple entities Using
// JSON files.
//
// Example:
//
// hero.json
// {
//   "type": 'Hero',
//   "stats": { "health": 100, "attack": 10 },
//   "states": ["battle"]
// }
//
// monster.json
// {
//   "type": 'Monster',
//   "stats": { "health": 50, "attack": 5 },
//   "states": ["battle"]
// }

var hero = world.createEntity(require('./hero.json'))
var monster = world.createEntity(require('./monster.json'))

// To use the regisered BattleState class we wrote earlier, we can stack that to
// the hero's state machine. The first argument is the name of the registered
// state to switch to, the second is an optional parameter that you can pass to
// your State subclass.
hero.states.push('battle', monster)

// Update the game world to run the state logic. The first argument is the
// time elapsed since the last update or delta time.
world.update(1)
```

Acknowledgment
==============

James Florentino

License
=======

MIT
