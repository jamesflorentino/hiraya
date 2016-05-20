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
- [x] FiniteStateMachine API - The state management design pattern used
- [ ] Entity State API - The state handling in an entity
- [ ] Entity Attribute API - e.g. health, mana, stamina, armor, etc.
- [ ] Entity Skill API - e.g. melee, double slash, jump and shoot
- [ ] Entity Item API - Able to store and manage items
- [ ] Player API - Handling of player attributes and events
- [ ] Player Input API - Handling of inputs from theplayer
- [ ] Multiplayer API - used for multiplayer

Example code
============

```javascript
import { Entity } from 'hiraya'

// our hero
var entity = new Entity()

// a basic callback for our stand state
var stand = () => entity.velocity.set(0)

// register the states that will be used in the game logic
entity.states.register('stand', stand)

// activate the states by pushing them into the entity's state machine
entity.states.push('stand')

// integrate the time elapsed
entity.update()

entity.active // => stand function
```


Acknowledgment
==============

James Florentino

License
=======

MIT
