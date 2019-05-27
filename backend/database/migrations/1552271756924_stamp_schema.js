'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StampSchema extends Schema {
  up() {
    this.create('stamps', (table) => {
      table.increments()
      table.string('code', 16).unique().notNullable()
      table.integer('producerId').notNullable()
      table.integer('ownerId').notNullable()
      table.specificType('productCode', 'CHAR(2)')
      table.integer('stampOrderId').notNullable()
      table.bigInteger('increments').notNullable().defaultTo(0)
      table.specificType('status', 'smallint').notNullable().defaultTo(0)
      table.string('txn').unique()
      table.timestamps()
      table.foreign('producerId').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('ownerId').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('stampOrderId').references('id').inTable('stamp_orders').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('productCode').references('code').inTable('product_types').onDelete('RESTRICT').onUpdate('CASCADE')
    })
  }

  down() {
    this.drop('stamps')
  }
}

module.exports = StampSchema
