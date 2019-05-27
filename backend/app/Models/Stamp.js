'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stamp extends Model {
  static get NEWLY() { return 0 }
  static get INITIATED() { return 1 }
  static get ACTIVATED() { return 2 }
}

module.exports = Stamp
