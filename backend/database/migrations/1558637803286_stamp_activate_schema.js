'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StampActivateSchema extends Schema {
  up() {
    this.create('stamp_activates', (table) => {
      table.increments()
      table.string('name', 16).notNullable()
      table.string('code', 16).unique().notNullable()
      table.integer('ownerId').notNullable()
      table.string('txn').unique()
      table.timestamps()
      table.foreign('ownerId').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('code').references('code').inTable('stamps').onDelete('RESTRICT').onUpdate('CASCADE')
    })
  }

  down() {
    this.drop('stamp_activates')
  }
}

module.exports = StampActivateSchema
