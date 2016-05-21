> WARNING: This framework is currently under development.

hiraya.js
=========

A microframework for game development in javascript.

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

Example code
============

```javascript
import hiraya from 'hiraya'

// our hero
var entity = hiraya.createEntity({
  velocity: hiraya.point()
})

// adding an attribute
entity.stats.add('speed', 100)

// a basic idle state
entity.states.register('idle', {
  update() {
    entity.velocity.x = 0
  }
})

// a basic walking state
entity.states.register('walk', {
  update() {
    entity.velocity.x = 1
  }
})

// activate the states by pushing them into the entity's state machine.
entity.states.push('idle')
entity.states.push('walk')

// integrate the time elapsed
entity.update() // idle() -> walk()
```

Acknowledgment
==============

James Florentino

License
=======

MIT
